import express from 'express';
import multer from 'multer';

const router = express.Router();

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

const defaultResult = ({ code = 200, msg = 'ok', status = 'success', success = true }) => {
  return {
    code,
    msg,
    status,
    success
  }
}

router.get('/getAssets/:id', (req, res) => {
  const id = req.params.id;
  res.send(defaultResult({}))
})

router.post('/upload', upload.single('file'), (req, res) => {
  res.send(defaultResult({}))
});

export default router