import path from "node:path";
import express from "express";
import multer from "multer";
import { ImgMapingTable } from "./img-table-map.js";
import type { ResponseFile, ResposeForm, UploadRequest } from "./interface.js";
import { PUBLIC_STATIC } from "./constance.js";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const router = express.Router();
const imgMappingTable = new ImgMapingTable();

/**
 * Middleware for binary file
 */
const storage = multer.diskStorage({
  destination: function (req, filem, cb) {
    // upload dir
    cb(null, __dirname + "/assets");
  },
  filename: function (req, file, cb) {
    // uplload filename
    cb(null, file.originalname);
  },
});

/**
 * Upload middlerware
 */
const upload = multer({ storage });

/**
 * Common result
 * @example
 * {
 *  code: 200,
 *  msg: 'ok',
 *  status: 'success',
 *  data: null,
 *  success: true
 * }
 */
const defaultResult = ({
  code = 200,
  msg = "ok",
  status = "success",
  success = true,
  data = null,
}) => {
  return {
    code,
    msg,
    status,
    data,
    success,
  };
};

/**
 * Get all img data
 */
router.get("/getAll", (req, res) => {
  const data = imgMappingTable.getAll();
  res.send(defaultResult({ data }));
});

/**
 * Get img by id
 */
router.get("/getAssets/:id", (req, res) => {
  const id = req.params.id;
  res.send(
    defaultResult({
      data: imgMappingTable.getById(id),
    })
  );
});

/**
 * Upload img
 */
router.post(
  "/upload",
  upload.single("file"),
  async (req: UploadRequest, res) => {
    if (!req.file) {
      res.send(defaultResult({ success: false }));
      return;
    }

    const data: ResponseFile & ResposeForm = {};

    data.filename = req.file.filename;
    data.mimetype = req.file.mimetype;
    data.originalname = req.file.originalname;
    data.path = PUBLIC_STATIC + "/" + req.file.filename;
    data.size = req.file.size;
    data.address = req.body.address;
    data.title = req.body.title;

    await imgMappingTable.insert(data);

    res.send(
      defaultResult({
        data,
      })
    );
  }
);

router.post("/delete", async (req, res) => {
  res.send(
    defaultResult({
      data: await imgMappingTable.deleteById(req.body.id),
    })
  );
});

router.post("/deleteAll", async (req, res) => {
  res.send(
    defaultResult({
      data: await imgMappingTable.deleteAll(),
    })
  );
});

export default router;
