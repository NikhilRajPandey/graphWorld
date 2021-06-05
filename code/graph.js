let nodeDiam = 60;
let selectedStroke = "grey";
let nodeBg = "lightblue";
let fontColor = "black";
let lineStrokeWeight = 1.5;
let txtSize = nodeDiam/3;
let selected = -1;
let arrowSize = nodeDiam/6;
let tracingKey = 17; // Control Key Code
let makeFriendKey = 16; // Shift Key Code

function node(x,y,number){
    const obj = {};
    obj.x = x;
    obj.y = y;
    obj.number = number;
    obj.friends = [];
    obj.friendDist = []; // This will be the distance between friend and node
    obj.friendAngle = []; // This will be the angle between friend and node
    return obj;
}

function graph(){
    this.Graph = [];

    this.addNode = function(x,y){
        let newNode = new node(x,y,this.Graph.length);
        this.Graph.push(newNode);
    }

    this.makeFriend = function(i,j){ // It means to add a connection from graph[i] to graph[j]
        this.Graph[i].friends.push(j);

        let friend = this.Graph[j];
        this.Graph[i].friendDist.push( dist(friend.x,friend.y,this.Graph[i].x,this.Graph[i].y) );

        let angle = atan2(friend.y - this.Graph[i].y,friend.x - this.Graph[i].x);
        /* These Are comments for debugging purpose if i have to change something in future
         console.log(this.Graph[i].x - friend.x);
         console.log(this.Graph[i].y - friend.y);
         console.log(degrees(angle) );
        */
        this.Graph[i].friendAngle.push(angle);
    }
    this.drawArrow = function(x,y,angle){ // A simple function to draw arrow
        push();
        strokeWeight(2);
        translate(x,y); 
        rotate(angle); // The angle will be in radians so not converting it into radians
        triangle(0,0,arrowSize,arrowSize,arrowSize,-arrowSize);
        pop();
    }
    this.displayNode = function(i){
        let curNod = this.Graph[i]; // Current Circle or node

        push();

        if(i == selected){
            stroke(selectedStroke);
            strokeWeight(3);
        }else{noStroke();}
        // Making The circle
        fill(nodeBg);
        ellipse(curNod.x,curNod.y,nodeDiam);
        
        // Writing the text
        noStroke();
        textSize(txtSize);
        fill(fontColor);
        text(curNod.number,curNod.x-textWidth(curNod.number)/2,curNod.y+txtSize/3);

        // This are approximate using trial and error don't touch these values

        pop();
    }
    this.displayLines = function(i){
        // This will make lines to the node friends
        push();
        translate(this.Graph[i].x,this.Graph[i].y);

        for(let j=0; j < this.Graph[i].friends.length; j++){
        // this.Graph[i].friends.forEach(friendIndex => {
            let friendIndex = this.Graph[i].friends[j];
            let friend = this.Graph[friendIndex];
            /* 
            [lineEndX,lineEndY] will be the point where the arrows will be made and line will be ended
            dBtwP is Distance Between Points [Current point and friend point]
            radi is radius of each circle
            */
            let dBtwP = this.Graph[i].friendDist[j];
            let radi = nodeDiam / 2;
            let lineEndX = (dBtwP - radi) * (friend.x - this.Graph[i].x) / dBtwP;
            let lineEndY = (dBtwP - radi) * (friend.y - this.Graph[i].y) / dBtwP;

            // Drawing the line
            strokeWeight(lineStrokeWeight);
            line(0, 0, lineEndX,lineEndY);

            // Now Drawing the arrow
            let arrowAngle = radians(180) + this.Graph[i].friendAngle[j];
            this.drawArrow(lineEndX,lineEndY,arrowAngle);
        }
        pop();

    }
    this.displayGraph = function(){
        for(let i=0; i< this.Graph.length; i++){
            this.displayLines(i);
            this.displayNode(i);


        }
    }
}
