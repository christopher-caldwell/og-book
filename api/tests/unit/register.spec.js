const { defineRegisterParams } = require('../../lambdas/users');
const AWS = require('aws-sdk-mock');
const event = {
  body: {
    Name: {
      S: "Bill"
    },
    Username: {
      S: "bill"
    },
    Password: {
      S: "password"
    }
  }
}


describe('Register a new user', () => {
  test('sanity', () => {
    expect(1).toBe(1);
  })
})
