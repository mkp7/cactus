const createJsonSchema = (schema) => {
    const jsonSchema = {
        type: 'object',
        properties: {},
        required: []
    }

    const typesMap = {
        text: 'string',
        bool: 'boolean',
        number: 'number'
    }

    schema.forEach((entity) => {
        jsonSchema.properties[entity.name] = { type: typesMap[entity.type] }
    })

    jsonSchema.required = schema.filter(entity => entity.required).map(entity => entity.name)
    return jsonSchema
}

export default createJsonSchema