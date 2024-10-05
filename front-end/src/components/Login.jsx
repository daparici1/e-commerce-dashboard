import React, { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        console.warn(email, password);
    }

    return(
        <div>
            <h1>Login</h1>
            <input type="text" className='inputBox' placeholder='Enter Email' 
            onChange={(e) => setEmail(e.target.value)} value={email}/>
            <input type="password" className='inputBox' placeholder='Enter Password' 
            onChange={(e) => setPassword(e.target.value)} value={password}/>
            <button onClick={handleLogin} className='loginButton' type="button">Login</button>
        </div>
    );
};

export default Login;