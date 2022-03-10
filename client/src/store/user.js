import {makeAutoObservable} from "mobx";

export default class User {

    constructor() {
        this.recordsList=[];

        this._isAuth = false
        this.login = false;
        this.userRecord = 0;

        makeAutoObservable(this, {}, {autoBind: true})
    }



    logOut(){
        this._isAuth = false
        this.login = false
        this.userRecord = 0
        localStorage.removeItem('token');
    }
    auth(login){
        this._isAuth = true
        this.login = login
    }

    setRecords(list){
        this.recordsList = list
    }

    setRecord(record){
        this.userRecord = record
    }
}
