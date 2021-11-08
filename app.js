const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// document.querySelectorAll(".jsColor")로 사용할 경우 Array.from()을 작성하지 않아도 forEach() 실행 가능
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2c2c2c";  //초기 색상

//canvas element에서 pixel을 다루기 위해 width와 height를 지정해줘야 함.
canvas.width = canvas.offsetWidth; 
canvas.height = canvas.offsetHeight;

//초기 배경 색상을 하얀색으로 설정(미설정 시 투명한 배경으로 설정됨.)
ctx.fillStyle = "white"; 
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5; //초기 굵기

let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function changeRange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(!filling){
    filling = true;
    mode.innerText = "Paint";
  } else {
    filling = false;
    mode.innerText = "Fill";
  }
}

function handleCanvasClick(){
  if(filling){
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL(); //기본 확장자 = png
  const link = document.createElement("a");
  link.href = image;
  link.download = "image"; //download는 링크로 이동하는 대신 사용자에게 URL을 저장할지 물어봅니다.
  link.click(); //element를 직접 클릭한 것과 같은 효과
}


if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM); //우클릭
}

// Array.from() 메소드는 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를
// 얕게 복사해 새로운 Array 객체를 만듭니다.
Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
  range.addEventListener("input", changeRange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(save){
  save.addEventListener("click", handleSaveClick);
}