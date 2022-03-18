"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
// import request from 'supertest';
const app_1 = __importDefault(require("../app"));
// describe("LOGIN FEATURE", () => {
//     const mockData1 = {
//         email: "notavalidemail@getMaxListeners.com",
//         password: "afakeuser"
//     }
//     const mockData2 =  {
//         firstName: "david",
//         lastName: "adejo",
//         email: "jenono@gmail.com",
//         password: "string",
//         avatar:"knyygyyygygy",
//         phoneNumber: "08189441180"
//       }
//     test("should validate wrong data input", async () => {
//         const response = await request(app).post('/api/v1/user/login').send(mockData1)
//         expect(response.status).toBe(400)
//         expect(response.body.message).toBe("user does not exist, kindly signup")
//     })
// })
const database_1 = require("../database/database");
let request;
let accessToken = '';
let id = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.mongoMockConnect)();
    request = (0, supertest_1.default)(app_1.default);
}));
describe('Endpoints for adding friends', () => {
    const data = {
        friend: {
            email: 'davidmomoh@gmail.com',
        },
    };
    test('Add friends', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/friends')
            .send(data)
            .set(`Authorization`, `Bearer ${accessToken}`);
        id = response.body.data.friend._id;
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe(friend);
    }));
});
describe('Endpoints for getting all friends', () => {
    test('Get all Friends', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/friends')
            .set(`Authorization`, `Bearer ${accessToken}`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('results');
        expect(response.body.data).toBe(friends);
    }));
});
function friend(friend) {
    throw new Error('Function not implemented.');
}
function friends(friends) {
    throw new Error('Function not implemented.');
}
// import supertest from 'supertest';
// import request from 'supertest';
// import app from '../app';
// describe('Test to confirm if a user recieves either a private or group message', () => {
//   it('Throw an error if a user is unable to successfully recieve a message', async () => {
//     const data = {
//       chatId: '61fa6bfa7806d877c91629dd',
//     };
//     await supertest(app)
//       .get('./chatId/messages')
//       .send(data)
//       .set('Accept', 'application/json')
//       .expect(404)
//       .expect((res: any) => {
//         expect(res.body.error).toBe('Unable to get messages');
//       });
//   });
// });
