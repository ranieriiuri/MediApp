import express from "express";
import AppointmentService from "../services/AppointmentService.js";

let router = express.Router();

//pegar todos
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentService.getAllAppointments();
        res.send(appointments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//pegar por id
router.get('/getAppointment/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const appointment = await AppointmentService.getAppointment(id);
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//save
router.post('/postAppointment', async(req, res) => {
    const {date, doctorId, pacientId} = req.body;
    try {
        const appointment = await AppointmentService.saveAppointment({date, doctorId, pacientId});
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//update(find and update com o mongoose)
router.put('/appointments/:id', async(req, res) => {
    const {id} = req.params;
    const {date, doctorId, pacientId} = req.body;
    try {
        const appointment = await AppointmentService.updateAppointment(id, {date, doctorId, pacientId});
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//delete
router.delete('/appointments/:id', async(req, res) => {
    const {id} = req.params;
    try {
        const appointment = await AppointmentService.deleteAppointment(id);
        res.send(appointment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

//remarcação de consulta
router.put('/reschedule/:id', async(req,res) => {
    //pega o id pelo params e o date do body e armazena nas vars, via desestruturação
    const {id} = req.params;
    const {date} = req.body;
    try {
        //pega o id passado e o busca e traz usando o método do service
        let appointment = await AppointmentService.getAppointment(id);
        //seta o date desse id com o date pego na var acima(passado no body da req)
        appointment.date = date;

        //e usa o método de atualizar do service passando o id q será atualizado e a nova data
        appointment = await AppointmentService.updateAppointment(id, {date});
        //envia como res essa atualização
        res.send(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

)

export default router;