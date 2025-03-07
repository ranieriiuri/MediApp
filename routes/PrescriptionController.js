import express from "express";
import PrescriptionService from "../services/PrescriptionService.js";
import multer from 'multer';
import process from "process";
import path from "path";

let router = express.Router();

//o multer é um middleware para upload de arq. no express

//essa configura a forma como os arquivos serão armazenados no servidor
const storage = multer.diskStorage(
    {
      destination: function(req, file, cb){
        cb(null, '../prescriptions/');
      },
      filename: function(req, file, cb){
        cb(null, file.originalname);
      }
    }
  );

  //essa inicializa o middleware do multer com a config de armazenamento 'storage' acima. Ou seja, é uma instância de config de como os arq. devem ser armazenados.
  
  const upload = multer({storage: storage});
  //daí p frente usamos o 'upload' p manipular os uploads de arq nas rotas (CRUD) do express 

  router.post('/uploadPrescription/:id', upload.single('file'), async (req, res) => {
    try {
      const { id } = req.params;
      let prescription = await PrescriptionService.getPrescription(id);
  
      const file = "../prescriptions" + req.file.originalname;
      prescription = await PrescriptionService.updatePrescription(id, { file });
  
      return res.status(200).send(prescription);
  
    } catch (error) {
      console.error(error);
        res.status(500).send(error);
    }
  }
  
  );
  
  //leitura do arq
  router.get('/readPrescription/:id', async(req,res) => {
    const { id } = req.params;
  
    try {
      const prescription = await PrescriptionService.getPrescription(id);
      //esse metodo do process considera nosso diretorio atual (pode ser q precise ser ajustado), já a resolve é o metodo p encontrar a prescrição correta
      let filePath = path.resolve(process.cwd() + "/../" + prescription.file);
      //se tudo der certo, retorna o caminho pra ler a prescrição e não a prescrição em si
      res.status(200).sendFile(filePath);
      
    } catch (error) {
      console.error(error);
        res.status(500).send(error);
    }
    }
  );
  
  router.get('/prescriptions', async (req, res) => {
      try {
        const prescriptions = await PrescriptionService.getAllPrescriptions();
        res.send(prescriptions);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
  });
  
  router.get('/getPrescription/:id', async (req, res) => {
    const { id } = req.params;
    try{
      const prescription = await PrescriptionService.getPrescription(id);
      res.send(prescription)
    } catch (error){
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  router.post("/postPrescription", async function(req, res){
      const { date, appointmentId, medicine, dosage, instructions } = req.body;
      try{
          const prescription = await PrescriptionService.savePrescription({ date, appointmentId, medicine, dosage, instructions });
          res.send(prescription);
      } catch (error) {
          console.error(error);
          res.status(500).send(error);
      }
  });
  
  router.put('/prescriptions/:id', async (req, res) => {
    const { id } = req.params;
    const { date, appointmentId, medicine, dosage, instructions } = req.body;
  
    try {
      const prescription = await PrescriptionService.updatePrescription(id, { date, appointmentId, medicine, dosage, instructions });
      res.send(prescription);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  router.delete('/prescriptions/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const prescription = await PrescriptionService.deletePrescription(id);
      res.send(prescription);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  // roteamento para suprir a req 
  // de gerar prescrição em PDF
  router.get('/generatePrescription/:id', async(req, res) => {
    const { id } = req.params;
    try {
      const prescription = await PrescriptionService.getPrescription(id);
      let generatedPrescription = await PrescriptionService.generatePrescriptionFile(prescription);
  
      const file = "../prescriptions/" + id + ".pdf";
      generatedPrescription = await PrescriptionService.updatePrescription(id, { file });
  
      res.send(generatedPrescription);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

export default router;