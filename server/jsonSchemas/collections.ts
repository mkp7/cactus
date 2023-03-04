const Ajv = require("ajv")
const ajv = new Ajv()

const collectionSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        schema: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    type: {
                        enum: ["text", "number", "bool"]
                    },
                    required: { type: "boolean" },
                    unique: { type: "boolean" }
                },
                required: ["type", "name", "required", "unique"]
            }
        }
    },
    required: ["name", "schema"],
    additionalProperties: false
}

export default collectionSchema