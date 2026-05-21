import { fileURLToPath } from "node:url";
import { app } from "../src/app.js";

export default app;

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
  });
}
