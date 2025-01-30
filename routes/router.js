import express from "express";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";


//Essa var utitliza um recurso do express p fazer o roteamento automático
let router = express.Router();

//Configuramos esse "get" q é uma callback q informa em caso de  sucesso da operação
router.get(
    "/", function(req, res) {
        console.log("Hi!");
        res.status(200).json({ message: "Hello!"});
    }
);

//estamos basicamente falando pro router do express p usar o / para controlar todas as funções da aplicação. E cada controller especifica sua rota...
router.use("/", appointmentController);
router.use("/", doctorController);
router.use("/", pacientController);
router.use("/", prescriptionController);

export default router;