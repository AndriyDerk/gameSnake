import './App.css'
import {observer} from "mobx-react-lite";
import React, {useContext, useEffect, useState} from 'react';
import AppRouter from "./components/AppRouter"
import {BrowserRouter} from "react-router-dom";
import {check, fetchRecords} from "./http/userAPI";
import {Context} from "./index";

const App = observer(() => {

    const [loading,setLoading] = useState(true)
    const {user} = useContext(Context)

    useEffect(()=>{
        // fetchRecords().then(data=>user.setRecords(data)).then(()=>{
        //     if(user._isAuth) check().then(data=>user.auth(data.login))
        // }).finally(()=>setLoading(false))

        // if(user._isAuth){
        //     check().then(data=>user.auth(data.login)).finally(()=>setLoading(false))
        // }else{
        //     setLoading(false)
        // }

        check().then(data=>user.auth(data.login)).finally(()=>setLoading(false))
    },[])


    if(loading){
        return (<div> loading app</div>)
    }


    return (

            <BrowserRouter>
                <AppRouter/>
            </BrowserRouter>

    )
})

export default App;
