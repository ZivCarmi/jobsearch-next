import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

import Seekers from "@/models/Seeker";
import { isValidFile } from "@/server/utils/validation";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/files");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 5000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  const options = {};

  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/files"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/files"));
  }

  options.uploadDir = path.join(process.cwd(), "/public/files");
  options.maxFileSize = 5000 * 1024 * 1024;
  options.filename = (name, ext, path, form) => {
    return Date.now().toString() + "_" + path.originalFilename;
  };

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
        return res.status(400).json({
          message: "There was an error parsing the files",
          error: err,
        });
      }

      const { uid } = req.headers;
      const { type } = req.query;

      // Check if single file or multiple
      if (!files[type].length) {
        const file = files[type];

        const isValid = isValidFile(file, ["pdf", "txt", "doc", "docx", "rtf"]);

        if (!isValid) {
          return res.status(400).json({
            message: "Unsupported file type",
          });
        }

        if (type === "resume") {
          try {
            // const updatedSeeker = await Seekers.findByIdAndUpdate(
            //   uid,
            //   { resume: file.filepath },
            //   { new: true }
            // );

            await Seekers.updateOne(
              { _id: uid },
              { $set: { resume: file.filepath } },
              {
                upsert: true,
              }
            );

            return res.json(file.filepath);
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Failed due to server error" });
          }
        }
      } else {
        // Multiple files
      }
    });
  });
};

export default handler;
