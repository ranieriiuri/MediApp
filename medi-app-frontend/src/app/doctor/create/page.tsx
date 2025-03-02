"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function DoctorCreate() {
    // o roteador é sempre usado pra navegar entre outras paginas
    const router = useRouter();
    //todas as var de estado q receberão os dados do formulario (abaixo) para estruturá-los no 'formData' abaixo que será enviado na req pro backend
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [medicalSpecialty, setMedicalSpecialty] = useState<string>('');
    const [medicalRegistration, setMedicalRegistration] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string>('');

    //tratamento de erro padrão
    const addDoctor = async (e: any) => {
        e.preventDefault();
        setError(null);

        // se os campos estiverem preenchidos, criar uma const com esses dados
        if (name != "" && login != ""
            && password != "" && medicalSpecialty != ""
            && medicalRegistration != "" && email != "" && phone != "") {

            const formData = {
                name: name,
                login: login,
                password: password,
                medicalSpecialty: medicalSpecialty,
                medicalRegistration: medicalRegistration,
                email: email,
                phone: phone
            }

            //retornar no console caso o token esteja vazio
            console.log(sessionStorage.getItem("token"));
            if(sessionStorage.getItem("token") == null) {
                setToken('');
            }
            
            //aqui, para criar um novo médico, já utilizamos o token para pedir autorização na req...
            const add = await fetch('http://127.0.0.1:3001/postDoctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token") || ''
                },
                body: JSON.stringify(formData)
            });

            const content = await add.json();

            if (content.login) {
                router.push('/home');
            } else {
                setError(content.error);
            }

        }


    };

    return (
        <>
            <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="/home">Voltar</Link>
            <form className='w-full' onSubmit={addDoctor}>
                <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Formulário Criação de Médico</span>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Nome</label>
                    <input type='text' name='name' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Login</label>
                    <textarea name='login' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setLogin(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Senha</label>
                    <textarea name='password' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPassword(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Especialidade Médica</label>
                    <textarea name='medicalSpecialty' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalSpecialty(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Registro Médico</label>
                    <textarea name='medicalRegistration' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setMedicalRegistration(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Email</label>
                    <textarea name='email' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setEmail(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <label htmlFor="" className='text-sm font-bold py-2 block'>Telefone</label>
                    <textarea name='phone' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e: any) => setPhone(e.target.value)} />
                </div>
                <div className='w-full py-2'>
                    <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
                </div>
                <div>
                    {error && <div className="p-2 text-white border-gray-200 border-[1px] rounded-sm bg-red-400" style={{ color: 'red' }}>{error}</div>}
                </div>
            </form></>
    )
}