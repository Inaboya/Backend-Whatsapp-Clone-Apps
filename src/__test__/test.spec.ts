import supertest from 'supertest';
// import request from 'supertest';
import app from '../app';
import profile from '../passport/passport-ggle';

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
import { mongoMockConnect, mongoDBConnect } from '../database/database';
let request: supertest.SuperTest<supertest.Test>;
let accessToken = '';
let id = '';
beforeAll(async () => {
  await mongoMockConnect();
  request = supertest(app);
});

describe('Endpoints for adding friends', () => {
  const data = {
    friend: {
      email: 'davidmomoh@gmail.com',
    },
  };

  test('Add friends', async () => {
    const response = await request
      .post('/friends')
      .send(data)
      .set(`Authorization`, `Bearer ${accessToken}`);
    id = response.body.data.friend._id;

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBe(friend);
  });
});

describe('Endpoints for getting all friends', () => {
  test('Get all Friends', async () => {
    const response = await request
      .get('/friends')
      .set(`Authorization`, `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('results');
    expect(response.body.data).toBe(friends);
  });
});

function friend(friend: any) {
  throw new Error('Function not implemented.');
}
function friends(friends: any) {
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
