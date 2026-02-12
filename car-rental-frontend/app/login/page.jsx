"use client"
import { useState } from "react";
import { API } from "../../lib/api";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit = async () =>{
    await fetch(`${API}/api/login`,{
      method:"POST",
      credentials:"include",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({email,password})
    });
    alert("Login done");
  }

  return (
    <div>
      <input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="password" type="password" onChange={e=>setPassword(e.target.value)}/>
      <button onClick={submit}>Login</button>
    </div>
  )
}
