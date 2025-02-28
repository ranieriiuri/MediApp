import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "../services/AppointmentService.js";
import PacientService from "../services/PacientService.js";
import DoctorService from "../services/DoctorService.js";
import fs from 'fs';
import PDFDocument from "pdfkit";

const getAllPrescriptions = async () => {
    return await PrescriptionRepository.getAllPrescriptions();
}

const getPrescription = async (id) => {
    return await PrescriptionRepository.getPrescription(id);
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    return await PrescriptionRepository.savePrescription({ date, appointmentId, medicine, dosage, instructions });
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions, file }) => {
    return await PrescriptionRepository.updatePrescription(id,
         { date, appointmentId, medicine, dosage, instructions, file});
}

const deletePrescription = async (id) => {
    return await PrescriptionRepository.deletePrescription(id);
}

// Nessa const/método definimos como o documento PDF da prescrição será definido...
const generatePrescriptionFile = async(prescription) => {
    //os dados serão todos pegos pela 'consulta', inclusive os dados do paciente e do médico da consulta
    const appointment = await AppointmentService.getAppointment(prescription.appointmentId);
    const pacient = await PacientService.getPacient(appointment.pacientId);
    const doctor = await DoctorService.getDoctor(appointment.doctorId);

    const id = prescription._id;
    const document = new PDFDocument({font: 'Courier'});
    const filePath = "../prescriptions/"+ id + ".pdf";

    // essa função 'pipe' usamos p direcionar a saída gerada pelo documento p um arquivo ou fluxo de dados. a 'fs.createWriteStream' cria um fluxo de escrita p o arq localizado em filePath ( o caminho onde o PDF será salvo)
    document.pipe(fs.createWriteStream(filePath));
    
    //as outras são definições da sequÇencia de textos que serão gerados no arq, seu fim e retorna essa PDF da prescrição
    document.fontSize(16).text("Pacient Name: " + pacient.name);
    document.fontSize(16).text("Doctor Name: " + doctor.name);

    const recipe = "Medicine: " + prescription.medicine;
    document.fontSize(12).text(recipe);

    document.fontSize(12).text("Dose: " + prescription.dosage);
    document.fontSize(12).text("Instructions: " + prescription.instructions);

    document.end();

    return prescription;
}

const prescriptionService = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription,
    generatePrescriptionFile
}

export default prescriptionService;