function clacInnerPi(NUM) {
    const radius = 200;
    const sideLength = 2 * radius * Math.sin(Math.PI / NUM);
    const perimeter = sideLength * NUM; return perimeter / (2 * radius);
}

function clacOuterPi(NUM) {
    const radius = 200;
    const sideLength = 2 * radius * Math.tan(Math.PI / NUM);
    const perimeter = sideLength * NUM; return perimeter / (2 * radius);
}

function drawCircle(ctx, radius) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2; ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black'; ctx.lineWidth = 2;
    ctx.stroke();
}

function drawPolygon(ctx, sides, color, radius) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    ctx.beginPath();
    for (let i = 0; i < sides; ++i) {
        const angle = i * 2 * Math.PI / sides - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        if (i === 0) {
            ctx.moveTo(x, y);

        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const circleRadius = 200;
const slider = document.getElementById("slider");
const sliderValue = document.getElementById("sliderValue");
const drawButton = document.getElementById("drawButton");

slider.addEventListener("input", function () {
    const value = Number(this.value);
    sliderValue.textContent = value;
});

slider.addEventListener("wheel", function (event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    let value = Number(slider.value);
    value -= delta;
    if (value >= slider.min && value <= slider.max) {
        slider.value = value;
        slider.dispatchEvent(new Event('input'));
    }
});

drawButton.addEventListener("click", function () {
    clearCanvas(ctx);
    const sides = Number(slider.value);
    drawCircle(ctx, circleRadius);
    drawPolygon(ctx, sides, 'red', circleRadius); // 内接するn角形 
    drawPolygon(ctx, sides, 'blue', circleRadius / Math.cos(Math.PI / sides)); // 外接するn角形
    const innerPi = clacInnerPi(sides);
    const outerPi = clacOuterPi(sides);
    document.getElementById('piRange').textContent = `${innerPi.toFixed(10)} < π < ${outerPi.toFixed(10)}`;
});

const initialSides = Number(slider.value);
clearCanvas(ctx);
drawCircle(ctx, circleRadius);
drawPolygon(ctx, initialSides, 'red', circleRadius); // 内接するn角形 
drawPolygon(ctx, initialSides, 'blue', circleRadius / Math.cos(Math.PI / initialSides)); // 外接するn角形 
sliderValue.textContent = initialSides;
const initialInnerPi = clacInnerPi(initialSides);
const initialOuterPi = clacOuterPi(initialSides);
document.getElementById('piRange').textContent = `${initialInnerPi.toFixed(10)} < π < ${initialOuterPi.toFixed(10)}`;