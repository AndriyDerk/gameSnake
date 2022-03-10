import React, {useContext} from 'react';
import useInterval from "../useInterval";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {updateScore} from "../http/userAPI";

const GameSpace = observer(() => {

    const {user} = useContext(Context)
    const {game} = useContext(Context)



    const main = (e) => {
        const isPause = game.pause === 'PAUSE'
        const isMovingBack = game.checkMoveBack(e.key)


        if (Date.now() - game.lastTime < 35 || isPause || isMovingBack ) {
            if(e.key === 'q')  game.changePause()
        } else {
            game.move(e.key)
        }

        //check if lastKey was coordinate key and is not moving back
        const checkMoveKey = e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'
        if (checkMoveKey && !game.checkMoveBack(e.key)) {
            game.lastKey = e.key
        }

        game.eating()
        const check = game.checkCoordinate()
        if(check === false){
            if(game.points>user.userRecord && user._isAuth) {
                updateScore(user.login, game.points).then(data => console.log(data))
            }
            game.gameOver()
        }

        game.lastTime = Date.now()
        game.checkCoordinate();
        game.checkAppleCoordinate()
    }

    useInterval(() => {
        if (Date.now() - game.lastTime > game.speed && game.pause === '') {
            main({key: game.lastKey})
        } else {
            console.log("pass")
        }
    }, game.speed)

    return (
        <div>
            <div className="gameSpace__info">
                <div className="points">Points: {game.points}</div>
                <div className="pause">{game.pause}</div>
                <div className="speed"> Speed: {game.speedName}</div>
            </div>
            <div className='gameSpace' tabIndex="0" onKeyDown={e => main(e)} role="button">
                <div className="apple" style={{
                    right: game.apple.x.toString() + 'px',
                    top: game.apple.y.toString() + 'px',
                    background: game.apple.background
                }}> </div>
                {
                    game.elems.map(elem =>
                        <div className="snake" key={elem.id} style={{
                            right: elem.x.toString() + 'px',
                            top: elem.y.toString() + 'px',
                        }}> </div>
                    )
                }
            </div>
        </div>
    );
})

export default GameSpace;