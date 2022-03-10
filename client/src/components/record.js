import React from 'react';
import {observer} from "mobx-react-lite";


const Record = observer(({data}) => {

    return (
        <div className="record">
            <span>{data.login}</span>, points: <span>{data.highScore}</span>
        </div>
    );
});

export default Record;