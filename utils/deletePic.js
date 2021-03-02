import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

let newDirname = fileURLToPath(dirname(import.meta.url));

export default async function deletePic(imageName) {
  let imageUrl = path.join(newDirname, `../public/images/events/${imageName}`);
  await fs.promises.unlink(imageUrl);
}
