
const getRandomNumbers = (w, h) => {

    let randomWidth = Math.floor(Math.random() * w)
    let randomHeigth = Math.floor(Math.random() * h)

    var free1=randomHeigth,free2=randomWidth;
    while(maze[free1][free2] != 1){
      free1--;
      if(free1 <= 0){
        free1 = height-2;
        free2--;
      }
    }

    let width = free2
    let heigth = free1

    return [width, heigth]
}

const addBox = (color) => {

    let boxLocation = getRandomNumbers(width, height);
    console.log(boxLocation)

    let box = document.createElement("a-box");
    box.setAttribute('static-body','');
    box.setAttribute('color', color);
    box.setAttribute('id', color);
    box.setAttribute('height', 1);
    box.setAttribute('width', 1);
    box.setAttribute('depth', 1);
    box.setAttribute('rotation','0 45 0');
    box.setAttribute('position', (3*(boxLocation[0]-(width-1)*.5))+' 1 '+(3*(boxLocation[0]-(height-1)*.5)))

    return box;
}

const addBoxes = (width, height) => {
    console.log('add boxes')

    var scene = document.getElementById('scene');

    const boxes = ['orange', 'yellow', 'blue', 'green', 'purple']

    for (let i = 0; i < boxes.length; i++) {
        scene.appendChild(addBox(boxes[i]))
        console.log(addBox(boxes[i]))
    }

}