import {  express  } from "express";
import AppoitmentService from "../services/AppointmentService";

let router = express.Router();

//pegar todos
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppoitmentService.getAllAppointments();
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

export default router;