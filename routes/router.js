import {  express  } from "express";

//Essa var utitliza um recurso do express p fazer o roteamento automático
let router = express.Router();

//Configuramos esse "get" q é uma callback q informa em caso de  sucesso da operação
router.get(
    "/", function(req, res) {
        console.log("Hi!");
        res.status(200).json({ message: "Hello!"});
    }
);

export default router;