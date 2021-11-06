const canvas = document.getElementById("jsCanvas");

function onMouseMove(event){
  console.log(event.offsetX, event.offsetY);
}

canvas.addEventListener("mousemove", onMouseMove);