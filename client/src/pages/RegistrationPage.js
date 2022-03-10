import React, {useContext, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {registration} from "../http/userAPI";
import {Context} from "../index";

const RegistrationPage = () => {
    const [loginName,setLoginName] = useState('')
    const [password, setPassword] = useState('')

    const {user} = useContext(Context)
    const navigate = useNavigate();

    const click = async () => {
        try{
            const response = await registration(loginName, password)
            user.auth(loginName)
            navigate("/")
        }catch(e){
            alert(e.response.data.message)
            setLoginName('')
            setPassword('')
        }
    }

    return (
        <div className="registration">
            <input
                value={loginName}
                onChange={e=>setLoginName(e.target.value)}
                placeholder="login"/>
            <input
                value={password}
                onChange={e=>setPassword(e.target.value)}
                type="password"
                placeholder="password"/>
            <NavLink to={LOGIN_ROUTE}>
                <div>have account? login</div>
            </NavLink>
            <button onClick={click}>registration</button>
        </div>
    );
};

export default RegistrationPage;