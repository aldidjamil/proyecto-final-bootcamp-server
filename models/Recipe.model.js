const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
            unique: true
        },
        description: {
            type: [{ Paso: { type: String }, description: { type: String } }],
            required: [true, 'La descripción es obligatoria.'],
            minlength: [20, 'La descripción debe tener min. 5 caracteres.']
        },
        imageUrl: {
            type: String,
            default: 'https://e7.pngegg.com/pngimages/426/730/png-clipart-logo-yellow-font-recipe-logo-art-thumbnail.png',
            required: [true, 'La imagen es obligatoria.'],
        },
        ingredients: {
            type: [{ ingredientes: { type: String } }],
            required: [true, 'Los ingredientes son necesarios']

        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

const Recipe = model("Recipe", recipeSchema)

module.exports = Recipe