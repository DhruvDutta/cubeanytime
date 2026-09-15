colors = [
  "rgba(255, 255, 255, 0.95)",
  "rgba(255, 255, 0, 0.95)",
  "rgba(0, 0, 255, 0.95)",
  "rgba(255, 132, 0, 0.95)",
  "rgba(0, 255, 0, 0.95)",
  "rgba(255, 0, 0, 0.95)"
];
deg = [[0,0], [0,180], [0,90], [90,0], [0,270], [-90,0]];
translate =[[-50,-50], [50,-50], [-50,50], [50,50]];
function create2x2(){
    var cubediv = document.getElementById("cube");
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 4; j++) {
            var face = document.createElement("div");
            face.className = "face";
            face.style.backgroundColor = colors[i];
            face.id = "face"+colors[i] + (j + 1);
            face.style.transform="rotateX(" + deg[i][0] + "deg) rotateY(" + deg[i][1] + "deg) translateZ(100px)"+ " translateX(" + translate[j][0] + "px) translateY(" + translate[j][1] + "px)";
            cubediv.appendChild(face);
        }
       
    }
}
create2x2();

let isDragging = false;
let startX = 0;
let startY = 0;

let rotateX = -20;
let rotateY = -30;

const cube = document.getElementById("cube");

document.body.addEventListener("mousedown", (e) => {
    isDragging = true;

    startX = e.clientX;
    startY = e.clientY;

    cube.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    rotateY += dx * 0.5;
    rotateX -= dy * 0.5;

    cube.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    startX = e.clientX;
    startY = e.clientY;
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    cube.style.cursor = "grab";
});