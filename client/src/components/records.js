import React, {useContext, useEffect,useState} from 'react';
import {observer} from "mobx-react-lite";
import Record from "./record";
import {Context} from "../index"
import {check, fetchRecords} from "../http/userAPI";

const Records = observer(() => {

    const [loading,setLoading] = useState(true)
    const {user} = useContext(Context)

    useEffect(()=>{
        fetchRecords().then(data=>user.setRecords(data)).finally(()=>setLoading(false))
    },[])


    if(loading){
        return (<div> loading records</div>)
    }

    return (
        <div className="records">
            RECORDS:
            {
                    user.recordsList.map((elem)=>{
                        return <Record data={elem} key={elem.id}/>
                    })

            }
        </div>
    );
});

export default Records;