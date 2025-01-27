import {  mongoose  } from 'mongoose';

const Schema = mongoose.Schema;

//Usamos o schema do mongoose pra criar nossos  modelos
const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Appointment Date is required.']
    },
    doctorId: {
        type: String,
        required: ['DoctorId is required.']
    },
    pacientId: {
        type: String,
        required: [true, 'PacientId is required.']
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
}
);

//Aqui informamos que esse modelo e uma entidade/tabela no DB, que se chama 'Appointment' e que a var appointmentSchema e quem a define
const appointment = mongoose.model('Appointment', appointmentSchema);

export default appointment;