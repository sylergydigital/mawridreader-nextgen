import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({
  // R2 incremental cache will be used by default
});

export default config;