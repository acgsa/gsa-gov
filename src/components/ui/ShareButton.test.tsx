/**
 * @jest-environment jsdom
 */

/**
 * ShareButton tests.
 *
 * Two behaviours matter and they are mutually exclusive at runtime, so both
 * paths are exercised by installing/removing `navigator.share`:
 *
 *   1. Web Share API present → native sheet, with a dismissal (AbortError)
 *      treated as a non-event rather than an error.
 *   2. Web Share API absent  → clipboard fallback with visible confirmation.
 *
 * The capability check runs in an effect (not in render) to avoid a hydration
 * mismatch, so the "Share" vs "Copy link" label is asserted with `findByRole`
 * to let that effect land first.
 *
 * `fireEvent` is used rather than `@testing-library/user-event` because the
 * latter is not a dependency of this project and adding one requires approval
 * under AGENTS.md. A plain click is sufficient here — there is no typing,
 * pointer sequencing, or focus choreography under test.
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShareButton } from "./ShareButton";

const PAGE = {
  title: "Norton photo gallery",
  text: "Photos of the Norton, Vermont land port of entry.",
  url: "https://www.gsa.gov/migration/gallery/norton-photo-gallery-166988",
};

/** Installs a stub clipboard and returns its writeText mock. */
function stubClipboard(impl: () => Promise<void> = () => Promise.resolve()) {
  const writeText = jest.fn(impl);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
    writable: true,
  });
  return writeText;
}

/** Installs a stub Web Share API and returns its share mock. */
function stubShare(impl: () => Promise<void> = () => Promise.resolve()) {
  const share = jest.fn(impl);
  Object.defineProperty(navigator, "share", {
    value: share,
    configurable: true,
    writable: true,
  });
  return share;
}

function removeShare() {
  // Deleting the property is how we simulate a desktop browser that never had
  // the API at all.
  Reflect.deleteProperty(navigator, "share");
}

afterEach(() => {
  removeShare();
  jest.clearAllMocks();
});

describe("ShareButton", () => {
  describe("when the Web Share API is unavailable", () => {
    it("offers to copy the link", async () => {
      stubClipboard();
      render(<ShareButton {...PAGE} />);
      expect(
        await screen.findByRole("button", { name: /copy link/i }),
      ).toBeInTheDocument();
    });

    it("writes the url to the clipboard and confirms", async () => {
      const writeText = stubClipboard();
      render(<ShareButton {...PAGE} />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /link copied/i }),
        ).toBeVisible(),
      );
      expect(writeText).toHaveBeenCalledWith(PAGE.url);
      // Announced for assistive tech, not just relabelled.
      expect(screen.getByRole("status")).toHaveTextContent(
        "Link copied to clipboard",
      );
    });

    it("reports a clipboard failure instead of claiming success", async () => {
      stubClipboard(() => Promise.reject(new Error("denied")));
      render(<ShareButton {...PAGE} />);

      fireEvent.click(screen.getByRole("button"));

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /copy failed/i }),
        ).toBeVisible(),
      );
    });
  });

  describe("when the Web Share API is available", () => {
    it("labels itself Share and opens the native sheet with the page details", async () => {
      const share = stubShare();
      stubClipboard();
      render(<ShareButton {...PAGE} />);

      fireEvent.click(await screen.findByRole("button", { name: /^share$/i }));

      await waitFor(() =>
        expect(share).toHaveBeenCalledWith({
          title: PAGE.title,
          text: PAGE.text,
          url: PAGE.url,
        }),
      );
    });

    it("treats a dismissed share sheet as a non-event", async () => {
      const share = stubShare(() =>
        Promise.reject(new DOMException("aborted", "AbortError")),
      );
      const writeText = stubClipboard();
      render(<ShareButton {...PAGE} />);

      fireEvent.click(await screen.findByRole("button", { name: /^share$/i }));

      await waitFor(() => expect(share).toHaveBeenCalled());
      // No confirmation, and no silent clipboard write the user did not ask for.
      expect(writeText).not.toHaveBeenCalled();
      expect(screen.getByRole("button", { name: /^share$/i })).toBeVisible();
      expect(screen.getByRole("status")).toHaveTextContent("");
    });

    it("falls back to the clipboard when the platform rejects the share", async () => {
      stubShare(() => Promise.reject(new Error("not allowed")));
      const writeText = stubClipboard();
      render(<ShareButton {...PAGE} />);

      fireEvent.click(await screen.findByRole("button", { name: /^share$/i }));

      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: /link copied/i }),
        ).toBeVisible(),
      );
      expect(writeText).toHaveBeenCalledWith(PAGE.url);
    });
  });

  it("shares the current location when no url is supplied", async () => {
    const share = stubShare();
    stubClipboard();
    render(<ShareButton title={PAGE.title} />);

    fireEvent.click(await screen.findByRole("button", { name: /^share$/i }));

    await waitFor(() =>
      expect(share).toHaveBeenCalledWith(
        expect.objectContaining({ url: window.location.href }),
      ),
    );
  });
});
