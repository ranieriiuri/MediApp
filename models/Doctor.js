import {  mongoose  } from 'mongoose';

const Schema = mongoose.Schema;

//Usamos o schema do mongoose pra criar nossos  modelos
const doctorSchema = new Schema({
    doctorId: {
        type: String,
        required: ['DoctorId is required.']
    },
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
        required: [true, 'Phone number is required.']
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