import React, {useEffect, useContext, useState} from 'react';
import GameSpace from "../components/gameSpace";
import {observer} from "mobx-react-lite";
import Records from "../components/records";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {getHighScore} from "../http/userAPI";
import {Context} from "../index";

const MainPage = observer(() => {

    const [loading,setLoading] = useState(true)
    const {user} = useContext(Context)

    useEffect(()=>{
        if(user._isAuth){getHighScore(user.login).then(record=>user.setRecord(record)).finally(()=>setLoading(false))}else{setLoading(false)}
    },[])


    if(loading){
        return (<div> loading main</div>)
    }

    return (
        <div className="MainPage">
            <div className="left__info">
                {user._isAuth ?
                    <div>
                        <span>your login: [{user.login}]</span>
                        <span className="userRecord"> your record: [{user.userRecord}]</span>
                        <span className="logout" onClick={user.logOut}>log out</span>
                    </div>
                    :
                    <div> you are logged in as a guest.<NavLink to={LOGIN_ROUTE}>auth</NavLink> </div>}
                <Records/>
            </div>

            <GameSpace/>

            <div className="rules">
                <div className="movement">
                    <div>MOVEMENT BY WASD</div>
                    <div className="start">To Start - Click Left Mouse Button On Black Area</div>
                    <div>Also, change the keyboard layout to English</div>
                    <div className="pause">PAUSE - PRESS Q</div>
                </div>
                <div className="feed">
                    Types of Feed:
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance1"> </div>
                        <div className="feed-item__text"> is 1 Point</div>
                    </div>
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance2"> </div>
                        <div className="feed-item__text"> is 5 Point</div>
                    </div>
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance3"> </div>
                        <div className="feed-item__text"> is 10 Point</div>
                    </div>
                </div>
                <div className="speed">
                    Every 50 point snake's speed is increase
                </div>
                <div>GOOD LUCK :з</div>
            </div>
        </div>
    );
})

export default MainPage;