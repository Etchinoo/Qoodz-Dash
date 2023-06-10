import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const removeViteSpaFallbackMiddleware = (middlewares) => {
  const { stack } = middlewares;
  const index = stack.findIndex(
    ({ handle }) => handle.name === "viteSpaFallbackMiddleware"
  );
  if (index > -1) {
    stack.splice(index, 1);
  } else {
    throw Error("viteSpaFallbackMiddleware() not found in server middleware");
  }
};

const removeHistoryFallback = () => {
  return {
    name: "remove-history-fallback",
    apply: "serve",
    enforce: "post",
    configureServer(server) {
      // rewrite / as index.html
      server.middlewares.use("/", (req, _, next) => {
        if (req.url === "/") {
          req.url = "/index.html";
        }
        next();
      });

      return () => removeViteSpaFallbackMiddleware(server.middlewares);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [removeHistoryFallback(), react()],
});

