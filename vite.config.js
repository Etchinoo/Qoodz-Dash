import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import {resolve} from "path";
import ViteRedirect404Plugin from "./vite.redirect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ViteRedirect404Plugin(), react()],
});

