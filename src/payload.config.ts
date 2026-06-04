import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // Admin panel configuration
  admin: {
    user: "users",
  },

  // Collections will be added here as they are created
  // See src/collections/ — each file exports a Payload collection config
  collections: [
    // TODO: import and add collections
    // e.g. import { Pages } from './collections/Pages'
  ],

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
