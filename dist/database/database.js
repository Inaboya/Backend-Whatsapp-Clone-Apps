"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoMockConnect = exports.mongoDBConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const pusher_1 = __importDefault(require("pusher"));
const MessageModel_1 = require("../models/MessageModel");
const pusher = new pusher_1.default({
    appId: '1355512',
    key: '94d55bd3b0ecf1274ef3',
    secret: '0744120e6b55a58f9043',
    cluster: 'eu',
    useTLS: true,
});
const mongoDBConnect = () => {
    var _a;
    try {
        const DB = (_a = process.env.MONGO_URL) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', process.env.MONGO_PASS);
        // Connect to MongoDB
        mongoose_1.default
            .connect(DB)
            .then(() => {
            console.log(`DB connection successful....`);
            // Connect to Pusher
            const changeStream = MessageModel_1.Message.watch();
            changeStream.on('change', (change) => {
                console.log(change);
                if (change.operationType === 'insert') {
                    const messageDetails = change.fullDocument;
                    pusher.trigger("messages", "inserted", {
                        message: messageDetails.text,
                        timestamp: messageDetails.createdAt,
                        received: messageDetails.receiver,
                    });
                }
                else {
                    console.log('Error triggering Pusher');
                }
            });
        })
            .catch((err) => {
            console.log(`DB connection error: ${err}`);
        });
        // Connect to Socket.io
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoDBConnect = mongoDBConnect;
const mongoMockConnect = () => {
    try {
        mongodb_memory_server_1.MongoMemoryServer.create().then((mongo) => {
            const uri = mongo.getUri();
            mongoose_1.default.connect(uri).then(() => {
                console.log(`Mock DB connected...`);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.mongoMockConnect = mongoMockConnect;
