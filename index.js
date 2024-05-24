const scale = 5; // 0->1 = 10px

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const rangeInput = document.querySelector("#rangeInput");
const rangeValueDiv = document.querySelector("#rangeValue");

const CANVAS_DIMENSIONS = { height: canvas.height, width: canvas.width };

const { height, width } = CANVAS_DIMENSIONS;

ctx.beginPath();
ctx.moveTo(0, height / 2);
ctx.lineTo(width, height / 2);
ctx.strokeStyle = "black";
ctx.stroke();

const sequence = [
  0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42,
  63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78,
  38, 79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29,
  88, 28, 89, 27, 90, 26, 91
].map((item) => item * scale);


//draw recaman has a logic to generate the visual representation of the sequnece which depicts the recaman sequence visually over the canvas
function drawRecaman(sequence) {
  let x = 0;
  let y = height / 2;
  ctx.beginPath();
  for (let i = 1; i < sequence.length; i++) {
    
    let diff = sequence[i] - sequence[i - 1];
    let radiusOfArc = Math.abs(diff);

    //if the differences exists the arc is set to positive or negative phases respectively continuing the arcs based on the even and odd values on either conditions, as the radiance is set to pi*1 or pi.
    if (diff > 0) {
      if (i % 2 == 0) {
        ctx.arc(x + radiusOfArc, height / 2, radiusOfArc, 0, Math.PI, true);
        x += 2 * radiusOfArc;
        y -= radiusOfArc;
      } else {
        ctx.arc(x + radiusOfArc, height / 2, radiusOfArc, 0, Math.PI, false);
        x += 2 * radiusOfArc;
        y -= radiusOfArc;
      }
    } else {
      if (i % 2 == 0) {
        ctx.arc(x - radiusOfArc, height / 2, radiusOfArc, 0, Math.PI, true);
        x -= 2 * radiusOfArc;
        y += radiusOfArc;
      } else {
        ctx.arc(x - radiusOfArc, height / 2, radiusOfArc, 0, Math.PI, false);
        x -= 2 * radiusOfArc;
        y += radiusOfArc;
      }
    }
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
}

function onLoad(arr) {
  return drawRecaman(arr);
}

const onInputChangeHandler = (value) => {
  rangeValueDiv.innerText = value;
//clear the whole canvas space, leaving behind the number line when the value becomes 0
  ctx.clearRect(0, 0, width, height);
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.strokeStyle = "black";
  ctx.stroke();
  //the values from the input emitted will reflect the sequence based on the values needed to generate the sequence respecively.
  let newSequence = sequence.slice(0, value);
  onLoad(newSequence); 
};

rangeInput.addEventListener("input", (e) =>
  onInputChangeHandler(e.target.value)
);

//when the js file loads, the sequence is kept to default value of 66.
onLoad(sequence);
