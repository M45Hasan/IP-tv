const fs = require("fs").promises;
const path = require("path");

const lib = {};
lib.storePath = path.join(__dirname, "/../uploads");
lib.delete = async (dir, file, extention, req, res) => {
  try {
    // unlink file
    await fs.unlink(`${lib.storePath + dir}/${file}.${extention}`);

    res
      .status(200)
      .json({ success: true, message: "File deleted successfully." });
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(404).json({ success: false, message: "File not found!" });
    } else {
      res
        .status(500)
        .json({ success: false, message: `Error: ${err.message}` });
    }
  }
};

module.exports = lib;
