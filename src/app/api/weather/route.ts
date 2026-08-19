import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/weather
 *
 * Server-side weather endpoint. Resolves the client IP → city/lat/lon via
 * ip-api.com, then fetches current conditions from the National Weather
 * Service (api.weather.gov) — a US government API requiring no key.
 *
 * Falls back to Washington, DC (GSA HQ) when geolocation fails or the
 * NWS cannot resolve the coordinates (e.g. non-US location, loopback IP
 * in local dev).
 *
 * All external calls happen server-side; the browser never contacts a
 * third-party service directly.
 *
 * Returns: { city, temp, unit, condition, icon } or null fields on failure.
 * A failed lookup always returns HTTP 200 so the UI degrades gracefully.
 */

// Force dynamic execution — disable Next.js fetch caching for this route
// so stale EMPTY responses from a previous broken state are not served.
export const dynamic = "force-dynamic";

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "";
}

function conditionEmoji(forecast: string): string {
  const f = forecast.toLowerCase();
  if (f.includes("thunder")) return "⛈️";
  if (f.includes("blizzard") || f.includes("snow")) return "❄️";
  if (f.includes("smoke") || f.includes("haze") || f.includes("dust"))
    return "🌫️";
  if (f.includes("fog") || f.includes("mist")) return "🌫️";
  if (f.includes("rain") || f.includes("shower") || f.includes("drizzle"))
    return "🌧️";
  if (f.includes("mostly cloudy") || f.includes("overcast")) return "🌥️";
  if (f.includes("partly")) return "⛅";
  if (f.includes("mostly sunny") || f.includes("mostly clear")) return "🌤️";
  if (f.includes("sunny") || f.includes("clear")) return "☀️";
  if (f.includes("windy") || f.includes("breezy")) return "💨";
  if (f.includes("cloudy")) return "☁️";
  return "🌡️";
}

const EMPTY = {
  city: null,
  temp: null,
  unit: "F",
  condition: null,
  icon: null,
};

/** Default location fallback: Washington, DC (GSA HQ) */
const DC_FALLBACK = { lat: 38.8951, lon: -77.0364, city: "Washington, DC" };

const NWS_HEADERS = { "User-Agent": "gsa.gov/weather-widget contact@gsa.gov" };

async function getNwsForecastUrl(
  lat: number,
  lon: number,
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.weather.gov/points/${lat.toFixed(4)},${lon.toFixed(4)}`,
      { headers: NWS_HEADERS },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      properties?: { forecastHourly?: string };
    };
    return json.properties?.forecastHourly ?? null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // ── Step 1: IP → lat / lon / city ──────────────────────────────────────
    const ip = getClientIp(req);
    const geoUrl = ip
      ? `https://ip-api.com/json/${ip}?fields=status,city,lat,lon`
      : "https://ip-api.com/json/?fields=status,city,lat,lon";

    let lat = DC_FALLBACK.lat;
    let lon = DC_FALLBACK.lon;
    let city = DC_FALLBACK.city;

    try {
      const geoRes = await fetch(geoUrl);
      if (geoRes.ok) {
        const geo = (await geoRes.json()) as {
          status: string;
          lat: number;
          lon: number;
          city: string;
        };
        if (geo.status === "success" && geo.lat && geo.lon) {
          lat = geo.lat;
          lon = geo.lon;
          city = geo.city;
        }
      }
    } catch {
      // geo lookup failed — use DC fallback (already set above)
    }

    // ── Step 2: lat/lon → NWS forecast hourly URL ──────────────────────────
    // NWS only covers US; retry with DC coords if the resolved location fails.
    let forecastHourlyUrl = await getNwsForecastUrl(lat, lon);
    if (!forecastHourlyUrl) {
      forecastHourlyUrl = await getNwsForecastUrl(
        DC_FALLBACK.lat,
        DC_FALLBACK.lon,
      );
      if (!forecastHourlyUrl) return NextResponse.json(EMPTY);
      city = DC_FALLBACK.city;
    }

    // ── Step 3: hourly forecast → current conditions ────────────────────────
    const forecastRes = await fetch(forecastHourlyUrl, {
      headers: NWS_HEADERS,
    });
    if (!forecastRes.ok) return NextResponse.json(EMPTY);

    const forecast = (await forecastRes.json()) as {
      properties?: {
        periods?: Array<{
          temperature: number;
          temperatureUnit: string;
          shortForecast: string;
        }>;
      };
    };
    const current = forecast.properties?.periods?.[0];
    if (!current) return NextResponse.json(EMPTY);

    return NextResponse.json({
      city: null,
      temp: current.temperature,
      unit: current.temperatureUnit,
      condition: current.shortForecast,
      icon: conditionEmoji(current.shortForecast),
    });
  } catch {
    return NextResponse.json(EMPTY);
  }
}
