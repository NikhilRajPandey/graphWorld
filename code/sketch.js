let ourGraph = new graph();
let ourStack = [];
let clickedCirc = -1; // Clicked Circle
let windowPos = [0,0];
let mouseOldPos = [];

/*
The stack will hold to tracking action [It will be used to undo and redo] 
*/

function addInStack(value){
    ourStack.push(value);
}
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function mousePressed() {
    mouseX -= windowPos[0];
    mouseY -= windowPos[1];
    if(keyIsDown(windowMovingKey)){
        // This means that user is trying to move window
        mouseOldPos = [mouseX,mouseY];
        return;
    }

    clickedCirc = -1;
    for(let i = 0; i < ourGraph.Graph.length; i++){
        let nod = ourGraph.Graph[i];
        let distance = dist(nod.x,nod.y,mouseX,mouseY);

        if( distance <= nodeDiam/2){ // This means that we clicked on a circle
            clickedCirc = i;
            break;
        }
        else if(distance <= nodeDiam){
            /* This means that we clicked nearby a circle and we can't make a circle there thus returning from this function*/
            return;
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
            /* By Default TracingKey is CONTROL and makeFriendKey is SHIFT Declared in graph.js*/

            else if(ourGraph.Graph[selected].friends.indexOf(clickedCirc) == -1
             && (keyIsDown(tracingKey) || keyIsDown(makeFriendKey) ) ) {
                    /* It means it clicked on the circle that is not its friend and 
                    tracingKey or makeFriendKey is pressed then it will make friend and make a line to 
                    the circle that is selected */
                    ourGraph.makeFriend(selected,clickedCirc);
                    addInStack(selected);
                    
                    if(keyIsDown(tracingKey)){
                        // If tracingKey is down then also selecting the circle that we have clicked
                        selected = clickedCirc;
                    }
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
        
        // Undoing the last change
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

function mouseDragged() {
    /*This is the code for moving the window or a circle*/

    // Means User trying to move the window
    if(keyIsDown(windowMovingKey)){
        windowPos[0] = [mouseX - mouseOldPos[0]];
        windowPos[1] = [mouseY - mouseOldPos[1]];

    }
    else{
        if(clickedCirc != -1 ){
            // Means User trying to move a circle
            ourGraph.Graph[clickedCirc].x = mouseX;
            ourGraph.Graph[clickedCirc].y = mouseY;
    
        }
    }
}
function draw() {
    translate(windowPos[0],windowPos[1]);
    background(210);
    ourGraph.displayGraph();

}
