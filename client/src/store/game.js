import {makeAutoObservable} from "mobx";
import uniqid from 'uniqid'
import randomInteger from 'random-int';

export default class Game {

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true})
    }

    elems = [
        {
            id: 1,
            x: 340,
            y: 200,
        },
        {
            id: 2,
            x: 340,
            y: 220,
        },
        {
            id: 3,
            x: 340,
            y: 240,
        },


    ]

    apple = {
        x: randomInteger(1, 24) * 20,
        y: randomInteger(1, 24) * 20,
        background: '#FFFF00',
        weight: 1,
    }

    start = [
        {
            id: 1,
            x: 340,
            y: 200,
        },
        {
            id: 2,
            x: 340,
            y: 220,
        },
        {
            id: 3,
            x: 340,
            y: 240,
        }
    ]

    randomTypeApple;

    speed = 160
    speedName = 'Slow'
    speedMod = 0

    points = 3;

    pause = 'PAUSE'

    checkX;
    checkY;

    currentX;
    currentY;

    lastKey = 'w';
    lastTime = Date.now();
    lastX;
    lastY;
    stop;

    newArr;


    changePause() {
        if (this.pause === 'PAUSE') {
            this.pause = ''
        } else {
            this.pause = 'PAUSE'
        }
    }

    gameOver() {
        this.elems = this.start
        this.points = 3
        this.lastKey = 'w'
        this.speed = 160
        this.speedName = "Slow"
        this.stop = false;
        this.speedMod = 0
    }

    eating() {
        if (this.elems[0].x === this.apple.x && this.elems[0].y === this.apple.y) {
            this.apple.x = randomInteger(1, 24) * 20
            this.apple.y = randomInteger(1, 24) * 20
            this.elems.push({id: uniqid(), x: this.lastX, y: this.lastY})
            this.points = this.points + this.apple.weight

            this.randomTypeApple = randomInteger(1, 8)
            if (this.randomTypeApple % 3 === 0) {
                this.apple.weight = 5
                this.apple.background = '#00FFFF'
            }
            if (this.randomTypeApple === 7) {
                this.apple.weight = 10
                this.apple.background = '#FF0000'
            }
            if (this.randomTypeApple % 2 === 0 || this.randomTypeApple === 1 || this.randomTypeApple === 5) {
                this.apple.weight = 1
                this.apple.background = '#FFFF00'
            }
            this.speedUp()
        }
    }

    speedUp() {
        if (Math.floor(this.points / 50) > this.speedMod && this.speed > 50) {
            this.speedMod = this.speedMod + 1
            this.speed = this.speed - 40
            switch (this.speed) {
                case 120:
                    this.speedName = 'Fast'
                    break;
                case 80:
                    this.speedName = "Faster"
                    break;
                case 40:
                    this.speedName = "The Fastest"
                    break;
            }
        }
    }

    checkAppleCoordinate() {
        this.elems.forEach(elem => {
            if (elem.x === this.apple.x && elem.y === this.apple.y) {
                this.apple.x = randomInteger(1, 24) * 20
                this.apple.y = randomInteger(1, 24) * 20
            }
        })
    }

    checkMoveBack(currentKey) {
        if(currentKey === 'w' && this.lastKey === "s" || currentKey === "s" && this.lastKey === "w" || currentKey === "a" && this.lastKey === "d" || currentKey === "d" && this.lastKey === "a") {
            return true
        }else{
            return false
        }
    }

    checkCoordinate() {
        this.currentX = this.elems[0].x
         this.currentY = this.elems[0].y
        //check if snake eating itself
        this.elems.forEach((elem, i) => {
            // this.currentX = this.elems[0].x
            // this.currentY = this.elems[0].y
            if (elem.x === this.currentX && elem.y === this.currentY && i!==0) {
                console.log(elem.x,this.currentX,elem.y,this.currentY)
                this.stop = true
            }
        })


        //checking border
        this.checkX = this.elems[0].x === 500 || this.elems[0].x === -20
        this.checkY = this.elems[0].y === 500 || this.elems[0].y === -20

        if(this.checkY || this.checkX) {
            this.stop = true
        }
        return this.stop !== true;

    }

    moveTop() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, y: elem.y - 20})
                this.lastY = elem.y
                this.lastX = elem.x

            } else {
                this.newArr.push({...elem, x: this.lastX, y: this.lastY})
                this.lastY = elem.y
                this.lastX = elem.x
            }
        })
        this.elems = this.newArr
    }

    moveBottom() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, y: elem.y + 20})
                this.lastY = elem.y
                this.lastX = elem.x
            } else {
                this.newArr.push({...elem, x: this.lastX, y: this.lastY})
                this.lastY = elem.y
                this.lastX = elem.x
            }
        })
        this.elems = this.newArr
    }

    moveRight() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, x: elem.x - 20})
                this.lastX = elem.x
                this.lastY = elem.y
            } else {
                this.newArr.push({...elem, y: this.lastY, x: this.lastX})
                this.lastX = elem.x
                this.lastY = elem.y
            }
        })
        this.elems = this.newArr
    }

    moveLeft() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, x: elem.x + 20})
                this.lastX = elem.x
                this.lastY = elem.y
            } else {
                this.newArr.push({...elem, y: this.lastY, x: this.lastX})
                this.lastX = elem.x
                this.lastY = elem.y
            }
        })
        this.elems = this.newArr
    }

    move(key){
        if(!this.checkMoveBack(key)){
            switch (key) {

                case('w'):
                    this.moveTop()
                    break;
                case('s'):
                    this.moveBottom()
                    break;
                case('a'):
                    this.moveLeft()
                    break;
                case('d'):
                    this.moveRight()
                    break;
                case('q'):
                    this.changePause()
                    break;
                default:
                    break;
            }
        }
    }
}