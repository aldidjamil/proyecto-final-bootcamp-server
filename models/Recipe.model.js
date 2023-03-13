const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
            unique: true
        },
        steps: [{
            description: String,
        }],
        imageUrl: {
            type: String,
            default: 'https://e7.pngegg.com/pngimages/426/730/png-clipart-logo-yellow-font-recipe-logo-art-thumbnail.png',
            required: [true, 'La imagen es obligatoria.'],
        },
        ingredients: {
            type: [String],
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