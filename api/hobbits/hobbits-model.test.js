const Hobbits=require('./hobbits-model')
const db = require('../../data/dbConfig')

//only execute one time at the beginning of whole tests
beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})
//beforeEach will execute at the beginning of the every test
beforeEach(async () => {
    await db.seed.run()
    
})
test("test the environment",()=>{
    expect(process.env.NODE_ENV).toBe("testing")

})

describe('getAll',()=>{
    test('resolves all hobbits in the table', async()=>{
        const result=await Hobbits.getAll()
        //console.log() helps to check the value of return
       // console.log(result)
         expect(result).toHaveLength(4)
        expect(result[0]).toMatchObject({ name: 'sam' },)
    })
})
describe('getById',()=>{
    test('resolve the hobbit by the given id',async()=>{
       let item=await Hobbits.getById(1)
        expect(item).toMatchObject({ name: 'sam' },)
        item = await Hobbits.getById(2)
        expect(item).toMatchObject({ name: 'frodo' },)
        item = await Hobbits.getById(3)
        expect(item).toMatchObject({ name: 'pippin' },)
        item = await Hobbits.getById(4)
        expect(item).toMatchObject({ name: 'merry' },)

    })
})
describe('insert',()=>{
    test('resolves the newly created hobbits',async()=>{
        const newItem=await Hobbits.insert({name:"can"})
        //console.log(newItem)
        expect(newItem).toMatchObject({ name: 'can' })

    })
    test('adds the hobbits to the hobbies table', async() => {
        await Hobbits.insert({ name: "cui" })
        //this time to directly use the db('hobbits'),not depends on Hobbits.getAll()
        const result=await db('hobbits')
        //console.log(result)
        expect(result).toHaveLength(5)

    })
})