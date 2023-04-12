let beadsTable = [];
document.getElementById("reset").onclick = reset;
window.onresize = reset;
const input = document.getElementById("numInput");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const sizeEl = document.querySelector("#size");
const speedEl = document.querySelector("#speed");
const svg = document.getElementById("bead-svg");
const sizeNumber = document.querySelector("#sizeNumber");
const speedNumber = document.querySelector("#speedNumber");
let size = sizeEl.value;
let speed = speedEl.value;
let isPlay = false;
let isSorting = false;
let svgHeigh = Math.round(svg.getBoundingClientRect().height);
let svgWidth = Math.round(svg.getBoundingClientRect().width);
let max = 0;
let codeIndex = 1;
let currCode = document.getElementById(`code-${codeIndex}`);
currCode.classList.add('rCode')

function runningCode(index) {
  currCode.classList.remove('rCode');
  codeIndex = index;

  currCode = document.getElementById(`code-${codeIndex}`);
  currCode.classList.add('rCode')
}

//main of Bead Sort

async function beadSort(numberList) {
  if (!isSorting) {
    // runningCode(2)
    // await sleep(1000/(speed * 5 ))

    beadsTable = initBeadsTable(numberList).beads;
    removeBeadsTable(numberList.length);
    max = initBeadsTable(numberList).max;
  }

  isSorting = true;

  //j = column
  for (let j = 0; j < max; j++) {
    runningCode(3)
    await sleep(500/(speed * 5 ))

    let sum = 0;
    runningCode(4)
    await sleep(500/(speed * 5 ))
    // i = row
    for (let i = 0; i < numberList.length; i++) {
      sum += beadsTable[i][j]; //sum all beads each column
      runningCode(5)
    await sleep(1000/(speed * 5 ))
    }

    while (!isPlay) await sleep(100);
    for (let i = 0; i < numberList.length; i++) {
      runningCode(6)
      await sleep(500/(speed * 5 ))
      while (!isPlay) await sleep(100);
      
      let count = 0;
      runningCode(7)
      await sleep(500/(speed * 5 ))

      if (sum > 0 && beadsTable[i][j] == 1) {
        runningCode(8)
        await sleep(500/(speed * 5 ))
          for (let k = 1; k <= i; k++) {
            runningCode(9)
            await sleep(500/(speed * 5 ))
            if (beadsTable[i - k][j] == 0) {
              count++;
              runningCode(10)
              await sleep(500/(speed * 5 ))
            }
          }

          // move down the beads
          dropBead(i + 1, j + 1, count);
          beadsTable[i][j] = 0;
          beadsTable[i - count][j] = 1;
          
          runningCode(11)
          // await sleep(500 / speed);
        
      }
    }
  }

  // sort : decrease
  for (let i = 0; i < numberList.length; i++) {

    while (!isPlay) await sleep(100);

    numberList[i] = sumBeads(beadsTable[i]);
    for (let j = 1; j <= numberList[i]; j++) {
      fillBead(i + 1, j, "green");
      await sleep(1000 / speed);
    }
    removeRowValue(i + 1);
    createCoor(30, svgHeigh - 20 - 60 * (i + 1), `row${i + 1}`, numberList[i], "green");
    var rValue = document.getElementsByClassName(`row${i + 1}`);
    rValue[0].setAttribute("fill", "green");
    
    runningCode(12)
    await sleep(2000/(speed * 5 ))
  }

  console.log(numberList);

  isPlay = false;
  isSorting = false;
  play.style.display = "";
  pause.style.display = "none";

  // createBeadsTable(numberList)
}

function initBeadsTable(numberList) {
  let beads = [];
  let temp = [];
  let max = numberList[0];

  // Find the maximum element
  for (let i = 1; i < numberList.length; i++) {
    if (numberList[i] > max) {
      max = numberList[i];
    }
  }
  // allocating memory
  // mark the beads
  for (let i = 0; i < numberList.length; i++) {
    temp = [];

    for (let j = 0; j < max; j++) {
      if (j < numberList[i]) {
        temp[j] = 1;
      } else temp[j] = 0;
    }

    beads.push(temp);
  }

  createTableLine(size);
  createBeadsTable(numberList);
  return {
    beads: beads,
    max: max,
  };
}

function sumBeads(row) {
  let sum = 0;
  let i = 1;
  row.forEach(async function (value) {
    sum += value;
    // fillBead(row + 1, i, 'green')
    i++;
  });
  return sum;
}

let list = [1, 3, 6, 13, 2, 12, 5, 4, 7, 9, 10]
// beadSort(list);
// let list = [];
const sleep = (delay) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

input.onkeydown = function (e) {
  let number = parseInt(input.value);
  if (number <= size && e.keyCode == 13) {
    //enter
    addNumber(number, list);
    input.value = "";
    console.log(number);
  }
};

play.addEventListener("click", () => {
  play.style.display = "none";
  pause.style.display = "";
  isPlay = true;
  beadSort(list);
});

pause.addEventListener("click", () => {
  isPlay = false;
  play.style.display = "";
  pause.style.display = "none";
});

function reset() {
  isPlay = false;
  isSorting = false;
  removeBeadsTable(beadsTable.length);
  removeBeadsTable(list.length);
  beadsTable = [];
  list = [];
}

sizeEl.addEventListener("input", function () {
  size = sizeEl.value;
  sizeNumber.innerHTML = size;
  svg.innerHTML = "";
  createTableLine(size);
  input.max = size;
  reset();
});

speedEl.addEventListener("input", function () {
  speed = speedEl.value;
  speedNumber.innerHTML = "x" + speed;
  // reset()
});

function createLine(x1, y1, x2, y2) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  // line.style.stroke = "rgba(184, 80, 20,100)"
  line.style.stroke = "rgb(0,0,0)";
  line.style.strokeWidth = "6";
  line.classList.add("line");

  svg.appendChild(line);
}

function createTableLine(size) {
  for (let i = 1; i <= size; i++) {
    createLine(60 * i, 0, 60 * i, svgHeigh);
  }
}

createTableLine(size);

function createBead(cx, cy, r, row, index) {
  let bead = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bead.setAttribute("fill", "black");
  bead.setAttribute("stroke-width", "4");
  bead.setAttribute("cx", cx);
  bead.setAttribute("cy", cy);
  bead.setAttribute("r", r);
  bead.classList.add(row);
  bead.id = `${row}-${index}`;

  svg.appendChild(bead);
}

function createBeadsRow(row_length, row) {
  for (let i = 1; i <= row_length; i++) {
    createBead(60 * i, svgHeigh - 25 - 60 * row, 25, row, i);
  }
  createCoor(30, svgHeigh - 20 - 60 * row, `row${row}`, row_length, "red");
}

function removeBeadsRow(row) {
  let beadsRow = document.getElementsByClassName(row);
  let length = beadsRow.length;
  let i = 0;
  while (length > 0) {
    beadsRow[i].parentNode.removeChild(beadsRow[i]);
    length--;
  }
}

function removeRowValue(row) {
  let rowValue = document.getElementsByClassName(`row${row}`);
  let length = rowValue.length;
  let i = 0;
  while (length > 0) {
    rowValue[i].parentNode.parentNode.removeChild(rowValue[i].parentNode);
    length--;
  }
}

function removeBeadsTable(rowNumber) {
  for (let i = 1; i <= rowNumber; i++) {
    removeBeadsRow(i);
    removeRowValue(i);
  }
}

function fillBead(row, index, color) {
  let element = document.getElementById(`${row}-${index}`);
  element.setAttribute("fill", color);
}

function createBeadsTable(list) {
  for (let i = 1; i <= list.length; i++) {
    createBeadsRow(list[i - 1], i);
    // createCoor(30, svgHeigh - 60*i, 1, row_length)
  }
}

function addNumber(number, list) {
  number = parseInt(input.value);
  list.push(number);
  createBeadsRow(number, list.length);
}

function dropBead(row, index, time) {
  let element = document.getElementById(`${row}-${index}`);

  fillBead(row, index, "rgb(158, 76, 13)");
  element.classList.add(`select-${60 * time}`);
  element.id = `${row - time}-${index}`;
  console.log(row, index, time);

}

function createCoor(x, y, className, value, color) {
  var gEle = document.createElementNS("http://www.w3.org/2000/svg", "g");

  var newText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  newText.setAttributeNS(null, "x", x);
  newText.setAttributeNS(null, "y", y);
  newText.setAttributeNS(null, "font-size", "30");
  newText.setAttributeNS(null, "font-weight", "bold");
  newText.setAttributeNS(null, "font-family", "Arial");
  newText.setAttributeNS(null, "fill", color);
  newText.style.textAlign = "center";
  newText.classList.add(className);
  newText.classList.add("row_value");

  var textNode = document.createTextNode(value);
  newText.appendChild(textNode);
  gEle.appendChild(newText);
  document.getElementById("coor").appendChild(gEle);
}
