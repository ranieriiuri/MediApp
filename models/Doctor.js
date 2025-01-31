import {  mongoose  } from 'mongoose';

const Schema = mongoose.Schema;

//Usamos o schema do mongoose pra criar nossos  modelos
const doctorSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Doctor name is required.']
    },
    login: {
        type: String,
        required: [true, 'Login is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    medicalSpecialty: {
        type: String,
        required: [true, 'Medical Specialty is required.']
    },
    medicalRegistration: {
        type: String,
        required: [true, 'Medical Specialty is required.'],
        unique: true
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
    } 
}
);

//Aqui informamos que esse modelo e uma entidade/tabela no DB, que se chama 'Appointment' e que a var appointmentSchema e quem a define
const doctor = mongoose.model('Doctor', doctorSchema);

export default doctor;