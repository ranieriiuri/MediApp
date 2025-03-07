import React from "react";
import Link from "next/link"; //faz o link com nossas páginas

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <div>
                <Link href="/doctor/create">Create new doctor</Link>
            </div>
            <div>
                <Link href="/doctor/list">List all doctors</Link>
            </div>
            
            <div>
                <Link href="/pacient/create">Create new pacient</Link>
            </div>
            <div>
                <Link href="/pacient/list">List all pacients</Link>
            </div>

            <div>
                <Link href="/appointment/create">Create new appointment</Link>
            </div>
            
            <div>
                <Link href="/prescription/create">Create new prescription</Link>
            </div>
            <div>
                <Link href="/prescription/upload">Upload prescription</Link>
            </div>
        </>
    );
}