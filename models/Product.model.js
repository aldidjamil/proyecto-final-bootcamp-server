const { Schema, model } = require("mongoose");

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
            unique: true            // No forma parte de Mongoose Validation
        },
        description: {
            type: [String],
            required: [true, 'La descripción es obligatoria.'],
            minlength: [5, 'La descripción debe tener min. 5 caracteres.']
        },
        format: {
            type: Number,
            required: [true, 'La longitud es obligatoria.'],
            min: [100, 'Sólo a partir de 100 gramos.']
        },
        stock: {
            type: Number,
            required: [true, 'La cantidad de producto es obligatoria']
        },
        imageUrl: {
            type: String,
            default: 'https://beanbased.es/wp-content/uploads/2022/04/cropped-image0.jpeg',
            required: [true, 'La imagen es obligatoria.'],
            default: 'https://beanbased.es/wp-content/uploads/2022/04/cropped-image0.jpeg'
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

const Product = model("Product", productSchema)

module.exports = Product