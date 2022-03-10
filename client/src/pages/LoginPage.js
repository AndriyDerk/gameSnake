import React, {useState, useContext} from 'react';
import {NavLink, useNavigate } from "react-router-dom";
import {REGISTRATION_ROUTE} from "../utils/consts";
import {login} from "../http/userAPI";
import {Context} from "../index";

const LoginPage = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [loginName,setLoginName] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            const data = await login(loginName, password)
            user.auth(loginName)
            navigate("/")
        }catch(e){
            console.log(e)
            alert(e.response.data.message)
            setLoginName('')
            setPassword('')
        }
    }

    return (
        <div className="login">
            <input
                value={loginName}
                onChange={e=>setLoginName(e.target.value)}
                placeholder="login"/>
            <input
                value={password}
                onChange={e=>setPassword(e.target.value)}
                type="password"
                placeholder="password"/>
            <NavLink to={REGISTRATION_ROUTE}>
                <div>haven't account? registration</div>
            </NavLink>
            <button onClick={click}>login</button>
        </div>
    );
};

export default LoginPage;