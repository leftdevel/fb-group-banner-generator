import path from "path";
import dotenv from "dotenv";
// import Scrapper from "./src/Scrapper";
import Painter from "./Painter";
import Photographer from "./Photographer";

dotenv.config();

async function main() {
  const port = 8080;
  const server = await Painter(port);
  const serverUrl = "http://localhost:8080";
  const fileName = path.join(__dirname, "..", "banner.jpg");
  await Photographer(serverUrl, fileName);
  await server.close();
}

main();

// async function main() {
//   const totalPhotos = await Scrapper();
//   console.log(totalPhotos);
// }
