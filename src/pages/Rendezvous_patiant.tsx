import React from "react";
import { useState } from "react";



let rd =[{date:"12/06/2025" , time :"10:00" , doctor :"Dr. Smith" } ,
{date:"15/06/2025" , time :"14:00" , doctor :"Dr. Johnson" } ,
{date:"20/06/2026" , time :"09:00" , doctor :"Dr. Lee" } ] ;

export default function RDV_patiant() {


  return <div> 

    <h2>Mes Rendez-vous</h2>
    <ul>
      {rd.map((rendezvous, index) => (
        <li key={index}>
          <strong>Date:</strong> {rendezvous.date} , 
          <strong>Heure:</strong> {rendezvous.time} , 
          <strong>Médecin:</strong> {rendezvous.doctor}
        <br />
        </li>
      ))}
    </ul>
  </div>;
}

