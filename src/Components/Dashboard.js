import React, { useState, useEffect } from "react";
export default function Dashboard() {
  let token = JSON.parse(localStorage.getItem('token'))
  const [json, setjson] = useState({});

  useEffect(async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token.Auth_token,
      },
    });
    setjson(await response.json());
  }, []);
 
  return(
    <>
    <h1 className="text-center">Hello {json.ecode}</h1>
    <button className="btn btn-danger" onClick={()=>{
        localStorage.clear();
        window.location.href = '/';
    }}> Log Out</button>
    </>
  )
     
}
