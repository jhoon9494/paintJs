const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500; //canvas element에서 pixel을 다루기 위해 width와 height를 지정해줘야 함.
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c"; //초기 색상
ctx.lineWidth = 2.5; //초기 굵기

let painting = false;

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

// function onMouseDown(event){ //마우스 클릭 중인 상태에서 실행되는 함수
//   painting = true;
// }

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseleave", stopPainting);