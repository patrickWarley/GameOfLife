const width = 100;
const heigth = 100;
const squareSize = 5;

let ctx, canvas, state;

async function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    canvas.style.border = "1px solid black";
    state = generateRandomMatrix();


    await draw();
    
    await updateScreen();

    await draw();
   
}

async function draw() {
    console.log(state);
    
    ctx.clearRect(0, 0, width, heigth);

    for (let i = 0; i < width / squareSize; i++) {
        for (let j = 0; j < heigth / squareSize; j++) {
            if (state[i][j]) {
                ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize)
            };
        }
    }

}

function generateRandomMatrix() {
    let matrix = []

    for (let i = 0; i < width / squareSize; i++) {
        matrix[i] = []
        for (let j = 0; j < width / squareSize; j++) {
            let r = (Math.random() * 10) > 8;
            matrix[i][j] = r;
        }
    }
    return matrix;
}

async function updateScreen() {

    let newState = [];
    for(let i=0; i<heigth/squareSize; i++)
        newState.push(new Array(heigth/squareSize));

    for (let i = 0; i < width / squareSize; i++) {
        for (let j = 0; j < heigth / squareSize; j++) {
            let n = updateStatus(state[i][j], i, j);
            newState[i][j] = n;
        }
    }

    state=newState;
}

function updateStatus(statusCenter, xCenter, yCenter) {

    let x = xCenter === 0 ? xCenter : xCenter - 1;
    let y = yCenter === 0 ? yCenter : yCenter - 1;
    let live = 0;
    let total =0;
    for (let i = x; ((i < width / squareSize) && (i < 3)); i++)
        for (let j = y; ((j < heigth / squareSize) && (j < 3)); j++) {
            total++;
            if(i === xCenter && j===yCenter) continue;
            
            if(state[i][j])live++;
        }
    console.log(state.length,total)
    //it's dead
    if(!statusCenter)return live === 3? true:false;
    else{
        if (live < 2){

            return false
        }
        else if (live > 3 ){
            return false;
        }

    
        return true;
    }
}


window.addEventListener('load', init);
