import {  mongoose  } from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pacient name is required.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth Date is required.']
    },
    email: {
        type: String,
        required: [true, 'E-mail contact is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.'],
        validate: {
            //Essa é uma função p validar um formato de num válido (brasil) utilizando regex, com um teste desse validador no final
            validator: function(v) {
                return /\d{2} 9\d{4}-\d{4}/.test(v);
            },
            //E dispara uma mensagem caso o formato não seja respeitado!
            message: props => 
                `${props.value} This is not a valid phone value. Please use the following format 99 91234-5678`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now    
    },
});

const pacient = mongoose.model('Pacient', pacientSchema);

export default pacient;