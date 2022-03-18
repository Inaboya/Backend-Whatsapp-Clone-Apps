import request from 'supertest';
import app from '../app';

describe('Whatsapp Sign Up User', () => {
  it('A User should be able to sign up', async () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      phoneNumber: '08144556677',
      password: '12345678',
      password2: '12345678',
      profilePicture: '',
    };

    const response = await request(app).post('/api/v1/users/signup').send(data);
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
  });
});

