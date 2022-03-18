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
const app_1 = __importDefault(require("../app"));
describe('Whatsapp Sign Up User', () => {
    it('A User should be able to sign up', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@gmail.com',
            phoneNumber: '08144556677',
            password: '12345678',
            password2: '12345678',
            profilePicture: '',
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/api/v1/users/signup').send(data);
        // console.log(response.body.user);
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('confirmCode');
        expect(response.body.user).toHaveProperty('firstName');
        expect(response.body.user).toHaveProperty('lastName');
        expect(response.body.user).toHaveProperty('email');
        expect(response.body.user).toHaveProperty('phoneNumber');
        expect(response.body.user).toHaveProperty('isVerified');
        expect(response.body.user).toHaveProperty('status');
        expect(response.body.user.status).toBe('Pending');
    }));
});
