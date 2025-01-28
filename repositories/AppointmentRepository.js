import {  Appointment  } from "../models/Appointment.js";

const getAllAppointment = async () => {
    return await Appointment.find();
}

const getAppointment = async (id) => {
    try {
        return await Appointment.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

const saveAppointment = async({date, doctorId, pacientId}) => {
    //essa func de create receberá data, id do médico e id do paciente (passados na req). E tentará criar a consulta(appointment) junto com a criação de uma prescrição (já que há um relacionamento forte entre esses 2). Tudo isso levando em conta que pode dar erro, então, num try/catch
    try {
        const prescription = new Appointment({date, doctorId, pacientId});
        return await prescription.save();
    } catch (error) {
        throw new Error(error);
    }
}

//No caso da atualização, precisamos saber qual doc atualizar, então passamos o id dele e os dados da consulta que serão atualizados...
const updateAppointment = async (id, {date, doctorId, pacientId}) => {
    //no try/catch usaremos o método de encontrar por id e já atualizar do mongoose, ele receberá esse id do doc, os dados json a atualizar e, caso não ache, criará uma nova consulta(appointment) com esses dados (new: true)
    try {
        return await Appointment.findByIdAndUpdate(id, {date, doctorId, pacientId}, {new: true} );
    } catch (error) {
        throw new Error(error);
    }
}

const deleteAppointment = async (id) => {
    //usa o método de achar por id e já deletar (tbm do mongoose)
    try {
        return await Appointment.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }
}

//juntando todos na var q será exposta !
const appointmentRepository = {
    getAllAppointment,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentRepository;