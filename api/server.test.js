const server = require('./server')
const db = require("../data/dbConfig")
const request = require('supertest')

const newUser ={
  username: 'Bilbo', 
  password: ""
}

const newUser1 = {
  username: '',
  password: '1234'
}


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy();
});

test('sanity check', () => {
  expect(1).toBe(1);
});


describe('POST /register', () => {
  test('returns status', async () => {
    const res = await request(server).post('/api/auth/register').send(newUser)
    expect(res.status).toBe(400)
  })
  test('returns message', async () =>{
    const res = await request(server).post('/api/auth/register').send(newUser1)
    expect(res.body.message).toBe('username and password required')
  })
})


describe('POST /login', () => {
  test('returns status', async () => {
    const res = await request(server).post('/api/auth/login').send(newUser)
    expect(res.status).toBe(400)
  })
  test('returns message', async () =>{
    const res = await request(server).post('/api/auth/login').send(newUser1)
    expect(res.body.message).toBe('username and password required')
  })
})

describe('Get /jokes', () => {
  test('resturns status', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
  })
  test('returns message', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body.message).toBe('token required')
  })
})