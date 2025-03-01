import bcrypt from 'bcrypt';
import express from "express";
import verifyToken from '../middleware/authMiddleware.js';
import doctorService from "../services/DoctorService.js";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import pacientController from "./PacientController.js";
import prescriptionController from "./PrescriptionController.js";
import jwt from 'jsonwebtoken';


//ranieriiuri's testing

//Essa var utitliza um recurso do express p fazer o roteamento automático
let router = express.Router();

//Configuramos esse "get" q é uma callback q informa em caso de  sucesso da operação
router.get(
    "/", function(req, res) {
        console.log("Hi!");
        res.status(200).json({ message: "Hello!"});
    }
);

// Toda construção do mapeamento do login vindo da entrada na req do usuário
router.post('/login', async (req,res) => {
    try {
        const { login, password } = req.body;
        const doctor = await doctorService.getDoctorByLogin(login);
        if (!doctor) {
            return res.status(401).json({error: 'Authentication failed!'});
        }

        // aqui o bcrypt compara a password da req com a password do médico (se são compatíveis), se não forem...
        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({error: 'Authentication failed!'});
        }
        // se forem compatíveis, passamos o 'sinal do jwt' passando o id do médico, a referência da secret key e um padrão de tempo de expiração desse token...
        const token = jwt.sign({doctorId: doctor._id}, 'you-secret-key', {
            expiresIn: '1h',
        });
        res.status(200).json({token});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Login failed!'});
    }
});

//estamos basicamente falando pro router do express p usar o / para controlar todas as funções da aplicação. E cada controller especifica sua rota...
router.use("/", verifyToken, appointmentController);
router.use("/", verifyToken, doctorController);
router.use("/", verifyToken, pacientController);
router.use("/", verifyToken, prescriptionController);

export default router;