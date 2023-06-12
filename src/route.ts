import express from 'express';
import multer from 'multer';
import { ImgMapingTable } from './img-table-map';

const router = express.Router();
const imgMappingTable = new ImgMapingTable();

/**
 * middleware for binary file
 */
const storage = multer.diskStorage({
  destination: function(req, filem, cb) {
    // upload dir
    cb(null, '/assets')
  },
  filename: function(req, file, cb) {
    // uplload filename
    cb(null, req.body().id + file.originalname)
  }
})

const upload = multer({ storage })

const defaultResult = ({ code = 200, msg = 'ok', status = 'success', success = true, data = null}) => {
  return {
    code,
    msg,
    status,
    data,
    success
  }
}

router.get('/getAll', (req, res) => {
  const data = imgMappingTable.getAll()
  res.send(defaultResult({ data }))
})

router.get('/getAssets/:id', (req, res) => {
  const id = req.params.id;
  res.send(defaultResult({}))
})

router.post('/upload', upload.single('file'), (req, res) => {
  res.send(defaultResult({}))
});

export default router