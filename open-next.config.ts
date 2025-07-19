import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
  // Use R2 for incremental static regeneration cache
  incrementalCache: r2IncrementalCache,
  
  // Environment variable mappings
  envVarsInBuild: {
    // These will be available during build time
    NEXT_PUBLIC_R2_BUCKET_URL: process.env.NEXT_PUBLIC_R2_BUCKET_URL,
    NEXT_PUBLIC_R2_PREFIX: process.env.NEXT_PUBLIC_R2_PREFIX,
    NEXT_PUBLIC_USE_LOCAL_IMAGES: process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES,
  },
});