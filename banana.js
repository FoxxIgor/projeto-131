var img = "";
var objects = [];
var statusAtual = false;

function preload(){
    img = loadImage("bananaimg.jpg");
}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    
}
function modelLoaded(){
    console.log("Modelo carregado");
    statusAtual = true;
    objectDetector.detect(img, gotResults)
}
function gotResults(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}
function voltar(){
    window.location= "index.html";
}

function draw(){
    image(img, 0, 0, 400, 400);
    if(statusAtual){
        document.querySelector("#status").innerHTML = "Status: Objeto Detectado";
        for(var i=0; i<objects.length; i++){
            porc = floor(objects[i].confidence*100);
            width = floor(objects[i].width)-200;
            height = floor(objects[i].height)-100;
            x = floor(objects[i].x);
            y = floor(objects[i].y);
            noFill();
            text(objects[i].label+" "+porc+"%", x, y);
            stroke("#FF0000");
            rect(x, y, width, height);
        }
    }
}