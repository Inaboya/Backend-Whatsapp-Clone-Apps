import multer from 'multer';
import path from 'path';

// multer config
// export const more = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
//       cb(new Error('Only images are allowed'), false);
//       return;
//     }
//     cb(null, true);
//   },
// });
let type = '';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../images'));
  },

  filename: function (req: any, file: any, cb: any) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'audio/mp3' ||
    file.mimetype === 'audio/mpeg' ||
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'video/3gp'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Image uploaded is not of type jpg/jpeg or png for audio, and mp3 or mpeg for audio'
      ),
      false
    );
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
