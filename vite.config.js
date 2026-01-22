import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        productListing: resolve(
          __dirname,
          "src/product_listing/index.html"
        ),
      },
    },
  },
});
