const { validatePassword } = require('../../lambdas/users');
const hashedPassword = '$2a$10$YgA0k0L5M.C4aFY8fJ/f3O5s4GiHV2aktWwCzDYrEOkxzpnj5GZSa';

describe('login test', () => {
  test('sanity test', () => {
    expect(1).toBe(1);
  })
  test('Correct password returns true', () => {
    expect(validatePassword('password', hashedPassword))
  })
  test('Invalid password returns false', () => {
    expect(validatePassword('billNye', hashedPassword)).toBe(false)
  })
})