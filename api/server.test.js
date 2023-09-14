const db=require('./../data/dbConfig')
const request=require('supertest')
const server=require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()

})

describe('GET /hobbits',()=>{
    test('responts with 200 ',async ()=>{
        const response=await request(server).get('/')
        expect(response.status).toEqual(200)

    })
    test('responds with hobbits ', async () => {
        const response = await request(server).get('/hobbits')
        expect(response.body).toHaveLength(4)

    })
})
describe('POST /hobbits', () => {
    const newHobbit = { name: "cui" }
    test('add a hobbit to the database ', async () => {
        await request(server).post('/hobbits').send(newHobbit)
        expect(await db('hobbits')).toHaveLength(5)

    })
    test('responds with the new hobbit ', async () => {

        const response = await request(server).post('/hobbits').send(newHobbit)
        console.log(response.body)
        expect(response.body).toMatchObject(newHobbit)

    })
})