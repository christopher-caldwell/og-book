import client from './client.js'

export default {
  async save({
    identifier, plainTextPassword, firstName, lastName
  }) {
    return (await client.post('/user/create', {
      identifier, plainTextPassword, firstName, lastName
    })).data
  },
  async search({ identifier, plainTextPassword }) {
    return (await client.put('/admin', { identifier, plainTextPassword })).data
  },
}
