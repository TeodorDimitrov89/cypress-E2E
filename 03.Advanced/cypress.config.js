import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        seedDatabase(filename) {
          // this is a dummy code example
          // Run some Node js code
          // e.g. edit file or setup database
          return filename;
        },
      });
    },
  },
});
