function drawCircle(ctx, radius) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawPolygon(ctx, sides, radius, color) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
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
    ctx.stroke();
}

function calculateInscribedPolygonPi(sides) {
    const angle = Math.PI / sides;
    const sideLength = 2 * Math.sin(angle);
    return (sides * sideLength) / 2; // 内接多角形の周長
}

function calculateCircumscribedPolygonPi(sides) {
    const angle = Math.PI / sides;
    const sideLength = 2 * Math.tan(angle);
    return (sides * sideLength) / 2; // 外接多角形の周長
}

document.getElementById('sidesSlider').addEventListener('input', function () {
    document.getElementById('sidesValue').innerText = this.value;
});

document.getElementById('drawButton').addEventListener('click', function () {
    const sides = Number(document.getElementById('sidesSlider').value);
    const canvas = document.getElementById('polygonCanvas').getContext('2d');

    const radius = 200; // Circle radius
    const outerRadius = radius / Math.cos(Math.PI / sides); // Outer polygon radius
    const innerRadius = radius; // Inner polygon radius

    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    drawCircle(canvas, radius); // Draw the circle
    drawPolygon(canvas, sides, outerRadius, "red"); // Outer polygon circumscribed around the circle, red color
    drawPolygon(canvas, sides, innerRadius, "blue"); // Inner polygon inscribed in the circle, blue color

    const inscribedPi = calculateInscribedPolygonPi(sides);
    const circumscribedPi = calculateCircumscribedPolygonPi(sides);

    document.getElementById('inscribedPiValue').innerText = `内接多角形: ${inscribedPi.toFixed(10)}`;
    document.getElementById('circumscribedPiValue').innerText = `外接多角形: ${circumscribedPi.toFixed(10)}`;
    document.getElementById('piInequality').innerText = `${inscribedPi.toFixed(10)} < π < ${circumscribedPi.toFixed(10)}`;
});

document.getElementById('sidesSlider').addEventListener('wheel', function (event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    const slider = document.getElementById('sidesSlider');
    let value = parseInt(slider.value);
    value = Math.max(slider.min, Math.min(slider.max, value - delta));
    slider.value = value;
    document.getElementById('sidesValue').innerText = value;
});

window.addEventListener('load', function () {
    const sides = Number(document.getElementById('sidesSlider').value);
    const canvas = document.getElementById('polygonCanvas').getContext('2d');

    const radius = 200; // Circle radius
    const outerRadius = radius / Math.cos(Math.PI / sides); // Outer polygon radius
    const innerRadius = radius; // Inner polygon radius

    canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    drawCircle(canvas, radius); // Draw the circle
    drawPolygon(canvas, sides, outerRadius, "red"); // 初期値で外接多角形を赤色の枠線で描画
    drawPolygon(canvas, sides, innerRadius, "blue"); // 初期値で内接多角形を青色の枠線で描画

    const inscribedPi = calculateInscribedPolygonPi(sides);
    const circumscribedPi = calculateCircumscribedPolygonPi(sides);

    document.getElementById('inscribedPiValue').innerText = `内接多角形: ${inscribedPi.toFixed(10)}`;
    document.getElementById('circumscribedPiValue').innerText = `外接多角形: ${circumscribedPi.toFixed(10)}`;
    document.getElementById('piInequality').innerText = `${inscribedPi.toFixed(10)} < π < ${circumscribedPi.toFixed(10)}`;
});
