import Ajv from "ajv"
import createJsonSchema from "./createJsonSchema"

const ajv = new Ajv()

const sampleSchema = [
    { "name": "title", "type": "text", "required": true, "unique": false },
    { "name": "content", "type": "text", "required": true, "unique": false },
    { "name": "isPrivate", "type": "bool", "required": false, "unique": false }
]

test('should return true when all required parameters & data types are satisfied', () => {
    const todoItemData = {
        title: 'todo1',
        content: 'fossHack',
        isPrivate: false
    }
    const jsonSchema = createJsonSchema(sampleSchema)

    const validate = ajv.compile(jsonSchema)
    const result = validate(todoItemData)
    console.log(validate.errors)
    expect(result)
        .toBeTruthy()
})

test('should return error when all required parameters are not satisfied', () => {
    const todoItemData = {
        title: 'todo1'
    }
    const jsonSchema = createJsonSchema(sampleSchema)
    const validate = ajv.compile(jsonSchema)

    const result = validate(todoItemData)
    console.log(validate.errors)
    expect(result)
        .toBeFalsy()
})

test('should return error when all required parameters does not match data types', () => {
    const todoItemData = {
        title: 'todo1',
        content: 1
    }
    const jsonSchema = createJsonSchema(sampleSchema)
    const validate = ajv.compile(jsonSchema)

    const result = validate(todoItemData)
    console.log(validate.errors)
    expect(result)
        .toBeFalsy()
})