import fs from "fs";
import path from "path";

function clearDir(directory) {
  if (!fs.existsSync(directory)) {
    return;
  }

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const filePath = path.join(directory, file);

      fs.unlinkSync(filePath, (err2) => {
        if (err2) {
          throw err2;
        }
      });
    }
  });
}

function prepareDistDir(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  clearDir(directory);
}

export default {
  clearDir,
  prepareDistDir,
};
