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
        required: ['DoctorId is required.'],
        validate: {
            validator: function(v) {
                const id = new mongoose.Types.ObjectId(v); //convertendo uma string em obj ID para ser encontrado no DB
                return Doctor.exists({_id: id}); //se o Id passado e convertido acima bate com o id de algum médico no db, retorna
            },
            message: props =>
                `DoctorID ${props.value} not found.`
        }
    },
    pacientId: {
        type: String,
        required: [true, 'PacientId is required.'],
        validate: {
            validator: function(v) {
                const id = new mongoose.Types.ObjectId(v); //convertendo uma string em obj ID para ser encontrado no DB
                return Pacient.exists({_id: id}); //se o Id passado e convertido acima bate com o id de algum médico no db, retorna
            },
            message: props =>
                `PacientID ${props.value} not found.`
        }
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