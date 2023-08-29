import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "hybrid",

  adapter: import.meta.env.PROD
    ? vercel()
    : node({
        mode: "standalone",
      }),

  vite: {
    ssr: {
      noExternal: ["react-icons", "react-reveal"],
    },
  },
});
