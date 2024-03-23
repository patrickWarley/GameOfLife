const width = 1000;
const heigth = 1000;
const squareSize = 5;

let ctx, canvas, state;

 function init() {
    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    canvas.style.border = "1px solid black";
    state = generateRandomMatrix();
    

     window.requestAnimationFrame(draw);
   
}

 function draw() {
   updateScreen();
    ctx.clearRect(0, 0, width, heigth);

    for (let i = 0; i < width / squareSize; i++) {
        for (let j = 0; j < heigth / squareSize; j++) {
            if (state[i][j]) {
                ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize)
            };
        }
    }

     window.requestAnimationFrame(draw);
   
}

function generateRandomMatrix() {
    let matrix = []

    for (let i = 0; i < width / squareSize; i++) {
        matrix[i] = []
        for (let j = 0; j < width / squareSize; j++) {
            let r = (Math.random() * 10) > 9;
            matrix[i][j] = r;
        }
    }
    return matrix;
}

 function updateScreen() {

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
    
    let alive = 0;
    
    for (let i = x, ii=0; ((i < width / squareSize) && (ii < 3)); i++, ii++)
        for (let j = y, jj=0; ((j < heigth / squareSize) && (jj < 3)); j++, jj++) {
            if(i === xCenter && j===yCenter) continue;
            
            if(state[i][j])alive++;
        }
    
    
    //it's dead
    if(!statusCenter)return alive === 3? true:false;

    else{
        if (alive < 2){
            return false;
        }
        else if (alive > 3 ){
            return false;
        }

    
        return true;
    }
}


window.addEventListener('load', init);
