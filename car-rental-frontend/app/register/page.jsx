"use client"
import { useState } from "react";
import { API } from "../../lib/api";

export default function Register(){
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
    role:"customer"
  });

  const submit = async ()=>{
    await fetch(`${API}/api/register`,{
      method:"POST",
      credentials:"include",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify(form)
    });
    alert("Registered");
  }

  return (
    <div>
      <input placeholder="name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>

      <select onChange={e=>setForm({...form,role:e.target.value})}>
        <option value="customer">Customer</option>
        <option value="agency">Agency</option>
      </select>

      <button onClick={submit}>Register</button>
    </div>
  )
}
