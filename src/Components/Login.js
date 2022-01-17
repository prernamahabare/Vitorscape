import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login=()=> {
    const [credentials, setcredentials] = useState({ ecode: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //login page to login user
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ecode: credentials.ecode, password: credentials.password })
        });
        const json = await response.json()

        if (json.success){
            // Save the auth token and redirect
            let json_1 = JSON.stringify(json)
            localStorage.setItem('token',json_1); 
            console.log(localStorage.getItem('token'))
            history.push('/dashboard');
        }
        else {
            alert("Invalid credentials");
        }

    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Ecode</label>
                    <input type="text" className="form-control" name="ecode" value={credentials.ecode} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
