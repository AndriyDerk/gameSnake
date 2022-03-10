import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import User from "./store/user";
import Game from "./store/game"
console.log(process.env.REACT_APP_API_URL)
export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new User(),
        game: new Game()

    }}>
    <App />
    </Context.Provider>,
  document.getElementById('root')
);
