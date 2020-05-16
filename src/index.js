import path from "path";
import dotenv from "dotenv";
// import Scrapper from "./src/Scrapper";
import Painter from "./Painter";
import Photographer from "./Photographer";
import Uploader from "./Uploader";

dotenv.config();

const banner = path.join(__dirname, "..", "banner.jpg");
const uploadUrl = "https://www.facebook.com/groups/961212304309293";

// async function main() {
//   const port = 8080;
//   const server = await Painter(port);
//   const serverUrl = "http://localhost:8080";
  // await Photographer(serverUrl, banner);
  // await server.close();
// }

async function upload() {
  await Uploader(uploadUrl, banner);
}

upload();

// async function main() {
//   const totalPhotos = await Scrapper();
//   console.log(totalPhotos);
// }
