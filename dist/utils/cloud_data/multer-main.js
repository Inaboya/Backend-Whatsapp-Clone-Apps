"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, '../../../images'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'audio/mp3' ||
        file.mimetype === 'audio/mpeg' ||
        file.mimetype === 'video/mp4' ||
        file.mimetype === 'video/3gp') {
        cb(null, true);
    }
    else {
        cb(new Error('Image uploaded is not of type jpg/jpeg or png for audio, and mp3 or mpeg for audio'), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
});
