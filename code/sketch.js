let ourGraph = new graph();
let ourStack = [];
/*
The stack will hold to tracking action [It will be used to undo and redo] 
*/

function addInStack(value){
    ourStack.push(value);
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function mouseClicked() {
    let clickedCirc = -1;
    for(let i = 0; i < ourGraph.Graph.length; i++){
        let nod = ourGraph.Graph[i];
        if( dist(nod.x,nod.y,mouseX,mouseY) <= nodeDiam/2){
            clickedCirc = i;
            break;
        }
    }

    if(clickedCirc != -1){ // It means it click on a circle
        if(selected == -1){ // it means there is no selected circle
            selected = clickedCirc;
        }
        else{
            if(clickedCirc == selected ){
                selected = -1;
            }
            else if(ourGraph.Graph[selected].friends.indexOf(clickedCirc) == -1 
                    && keyIsDown(CONTROL)) {
                    /* It means it clicked on the circle that is not its friend and 
                    control is pressed then it will make friend and make a line to 
                    the circle that is selected */
                    ourGraph.makeFriend(selected,clickedCirc);
                    addInStack(selected);
            }
            else{
                selected = clickedCirc;
            }

        }
    }
    else{
        ourGraph.addNode(mouseX,mouseY);
        addInStack(ourGraph.Graph.length-1);

        selected = -1;
    }
}
function keyPressed() {
    if (keyIsDown(CONTROL) && keyCode == 90 && ourStack.length != 0) {
        // KeyCode 90 is Z And it means Crtl + Z is pressed
        let lastNodeModified = ourStack[ourStack.length - 1];

        if(ourGraph.Graph[lastNodeModified].friends.length == 0 ){
            ourGraph.Graph.pop();
        }
        else{
            ourGraph.Graph[lastNodeModified].friends.pop();
        }
        ourStack.pop();
    }
    lastKeyPressed = keyCode;
}
  
function draw() {
    background(210);
    ourGraph.displayGraph();
}
