let path = require("path");
let fs = require("fs");

module.exports = async function deletePic(imageName) {
  let imageUrl = path.join(__dirname, `../public/images/events/${imageName}`);
  await fs.promises.unlink(imageUrl);
};
