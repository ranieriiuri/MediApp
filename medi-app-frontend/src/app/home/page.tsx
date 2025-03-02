import React from "react";
import Link from "next/link"; //faz o link com nossas páginas

export default function Home(){
    return (
        <>
            <h1>Home</h1>
            <div>
                <Link href="/doctor/create">Create new doctor</Link>
            </div>
        </>
    );
}