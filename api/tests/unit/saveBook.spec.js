const jwt = require('jsonwebtoken');
const token = jwt.sign({}, 'secret', {
  expiresIn: "5 days"
});
const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTcxNTkxMjUsImV4cCI6MTU1NzE1OTEzNX0.iPVWFAQxYQG8Q0sTc3M5DBqZkUIctXQqNxBnt1TnU3s";

describe('Saving a book to a given list', () => {
  test('response of valid jwt verification', async () => {

    let response = "";
    try {
      await jwt.verify(token, 'secret');
      response = "yes"
    } catch (error) {
      response = "no"
    }
    expect(response).toBe('yes')
  })
  test('response of invalid jwt verification', async () => {

    let response = "";
    try {
      await jwt.verify(expiredToken, 'secret');
      response = "yes"
    } catch (error) {
      response = "no"
    }
    expect(response).toBe('no')
  })
})