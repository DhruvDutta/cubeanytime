colors = [
  "rgba(255, 255, 255, 0.95)",
  "rgba(255, 255, 0, 0.95)",
  "rgba(0, 0, 255, 0.95)",
  "rgba(255, 132, 0, 0.95)",
  "rgba(0, 255, 0, 0.95)",
  "rgba(255, 0, 0, 0.95)"
];
const baseSize = parseFloat(
    getComputedStyle(document.documentElement)
        .getPropertyValue("--base-size")
);
const cubeSize = parseFloat(
    getComputedStyle(document.documentElement)
        .getPropertyValue("--cube-size")
);;
movepx = baseSize / cubeSize/2;
deg = [[0,0], [0,180], [0,90], [90,0], [0,270], [-90,0]];
translate =[[-movepx,-movepx], [movepx,-movepx], [-movepx,movepx], [movepx,movepx]];
function create2x2(){
    var cubediv = document.getElementById("cube");
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 4; j++) {
            var face = document.createElement("div");
            face.className = "face";
            face.style.backgroundColor = colors[i];
            face.id = "face"+i + (j + 1);
            face.dataset.faceIndex = i+1;
            face.dataset.subFaceIndex = j+1;
            face.style.setProperty("--x", `${translate[j][0]}px`);
            face.style.setProperty("--y", `${translate[j][1]}px`);
            face.style.setProperty("--degx", `${deg[i][0]}deg`);
            face.style.setProperty("--degy", `${deg[i][1]}deg`);
            face.innerText =`${translate[j][0]},${translate[j][1]} \n degx:${deg[i][0]} degy:${deg[i][1]}`;
            //face.style.transform="rotateX(" + deg[i][0] + "deg) rotateY(" + deg[i][1] + "deg) translateZ(100px)"+ " translateX(" + translate[j][0] + "px) translateY(" + translate[j][1] + "px)";
            cubediv.appendChild(face);
        }
       
    }
}
create2x2();

let isDragging = false;
let startX = 0;
let startY = 0;

let rotateX = 0;
let rotateY = 0;

const cube = document.getElementById("cube");

document.body.addEventListener("mousedown", (e) => {
    if (cube.contains(e.target)) {
        return; // Ignore clicks/drags on the cube
    }

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


document.querySelectorAll(".face").forEach(face => {

    face.addEventListener("pointerdown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
    });

    face.addEventListener("pointerup", (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // Ignore tiny movements
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
            return;
        }

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal swipe
            if (dx > 0) {
                console.log("Swipe Right");
                var faces = getRotationfaces(face, "right");
                faces.forEach(f => {
                    f.style.setProperty("background-color", "black");
                    f.style.setProperty("color", "white");
                });
            } else {
                console.log("Swipe Left");
                var faces = getRotationfaces(face, "left");
                faces.forEach(f => {
                    f.style.setProperty("background-color", "black");
                    f.style.setProperty("color", "white");
                });
            }
        } else {
            // Vertical swipe
            if (dy > 0) {
                console.log("Swipe Down");
                getRotationfaces(face, "down");
            } else {
                console.log("Swipe Up");
                getRotationfaces(face, "up");
                var faces = getRotationfaces(face, "up");
                faces.forEach(f => {
                    f.style.setProperty("background-color", "black");
                    f.style.setProperty("color", "white");
                });
            }
        }
    });
});

function getRotationfaces(face, direction) {
    const currentX = getComputedStyle(face).getPropertyValue("--x").trim().replaceAll("px", "");
    const currentY = getComputedStyle(face).getPropertyValue("--y").trim().replaceAll("px", "");
    const currentDegY =
        parseFloat(getComputedStyle(face).getPropertyValue("--degy")) || 0;
    const currentDegX =
        parseFloat(getComputedStyle(face).getPropertyValue("--degx")) || 0;
    console.log(currentX, currentY, currentDegY, currentDegX);
    const rotationFaces = [];
    document.querySelectorAll(".face").forEach(f => {
                    const x = getComputedStyle(f).getPropertyValue("--x").trim().replace("px", "");
                    const y = getComputedStyle(f).getPropertyValue("--y").trim().replace("px", "");
                    const DegY =
                        parseFloat(getComputedStyle(f).getPropertyValue("--degy")) || 0;
                    const DegX =
                        parseFloat(getComputedStyle(f).getPropertyValue("--degx")) || 0;
                    if(direction === "right"){
                        if(currentY === y && Math.abs(currentX) === Math.abs(x) && currentDegX === DegX){
                            rotationFaces.push(f);
                        }
                        if(currentY<0 && currentDegX+90 === DegX && currentDegY === DegY){
                            rotationFaces.push(f);

                        }
                        if(currentY>0 && currentDegX === DegX+90 && currentDegY === DegY){
                            rotationFaces.push(f);
                        }
                    }
                    if(direction === "left"){
                        if(currentY === y && Math.abs(currentX) === Math.abs(x) && currentDegX === DegX){
                            rotationFaces.push(f);
                        }
                        if(currentY<0 && currentDegX+90 === DegX && currentDegY === DegY){
                            rotationFaces.push(f);

                        }
                        if(currentY>0 && currentDegX === DegX+90 && currentDegY === DegY){
                            rotationFaces.push(f);
                        }
                    }
                    if(direction === "up"){
                        if(currentX === x && Math.abs(currentY) === Math.abs(y) && currentDegY === DegY){
                            rotationFaces.push(f);
                        }
                        if(currentY<0 && currentDegY+90 === DegY && currentDegX === DegX){
                            rotationFaces.push(f);

                        }
                        if(currentY>0 && currentDegY > DegY){
                            rotationFaces.push(f);
                        }
                    }
                });
    return rotationFaces;
}