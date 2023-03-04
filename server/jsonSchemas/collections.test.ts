import jsonSchema from './collections'
const Ajv = require("ajv")
const ajv = new Ajv()


test('should return error when all required parameters are not satisfied', () => {
    const collections = {
        name: "todos",
        schema: [
            {
                required: true,
                unique: false
            }
        ]
    }
    const validate = ajv.compile(jsonSchema)
    const result = validate(collections)
    expect(result)
        .toBeFalsy()
})

test('should return error when all required parameters does not match data types', () => {
    const collections = {
        name: "todos",
        schema: [
            {
                name: false,
                type: 'text',
                required: true,
                unique: false
            }
        ]
    }
    const validate = ajv.compile(jsonSchema)
    const result = validate(collections)
    expect(result)
        .toBeFalsy()
})

test('should return true when all required parameters & data types are satisfied', () => {
    const collections = {
        name: "todos",
        schema: [
            {
                name: "text",
                type: 'text',
                required: true,
                unique: false
            }
        ]
    }
    const validate = ajv.compile(jsonSchema)
    const result = validate(collections)
    expect(result)
        .toBeTruthy()
})