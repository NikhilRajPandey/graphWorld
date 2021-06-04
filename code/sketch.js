let ourGraph = new graph();
let ourStack = [];
let curActionI = -1;
/*
The stack will hold to tracking action [It will be used to undo and redo] 
CurActionI will be the length of ourStack but when undo will occur then we will subtract it by 1 if it is greater than 0 and when reundo will occur then we will add 1 to it.
*/

function addInStack(value){
    ourStack.splice(curActionI+1,);
    ourStack.push(value);
    curActionI++;
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
            else if(ourGraph.Graph[selected].friends.indexOf(clickedCirc) != -1) {
                // It means it clicked on the circle that is already its friend
                selected = clickedCirc;
            }
            else{
                // Otherwise it will make friend and make a line to the circle that is selected
                ourGraph.makeFriend(selected,clickedCirc);
                addInStack(selected);

                if(keyIsDown(CONTROL)){
                    // If control button is pressed then the node that is friend will be selected
                    selected = clickedCirc;
                }

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
    if (keyIsDown(CONTROL) && keyCode == 90 && curActionI != -1) {
        // KeyCode 90 is Z And it means Crtl + Z is pressed
        let lastNodeModified = ourStack[curActionI];

        if(ourGraph.Graph[lastNodeModified].friends.length == 0 ){
            ourGraph.Graph.pop();
        }
        else{
            ourGraph.Graph[lastNodeModified].friends.pop();
        }
        curActionI--;
    }
    lastKeyPressed = keyCode;
}
  
function draw() {
    background(210);
    ourGraph.displayGraph();
}
