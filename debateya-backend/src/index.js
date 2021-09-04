import "@babel/polyfill";
import { app, server } from "./server";

async function main() {
  //
  //await app.listen(app.get("port"));
  await server.listen(app.get("port"));
  console.log(
    `Server on port ${app.get("port")} -> http://localhost:${app.get("port")}`
  );
}
main();
