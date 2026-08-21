import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";
import { Media } from "./collections/Media";
import { Stories } from "./collections/Stories";
import { Pages } from "./collections/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: "users",
  },

  collections: [Media, Stories, Pages],

  // Globals will be added here
  globals: [
    // TODO: import and add globals
    // e.g. import { SiteConfig } from './globals/SiteConfig'
  ],

  // Rich text editor
  editor: lexicalEditor({}),

  // Secret key — MUST be set via environment variable, never hardcoded
  secret: process.env.PAYLOAD_SECRET ?? "",

  // TypeScript types output location
  typescript: {
    outputFile: path.resolve(dirname, "../payload-types.ts"),
  },

  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? "",
    },
  }),

  // GraphQL playground — disable in production
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "../generated-schema.graphql"),
  },
});
