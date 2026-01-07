
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(50, 50, 150, 80);

ctx.beginPath();
ctx.arc(350, 120, 50, 0, 2 * Math.PI);
ctx.fillStyle = "purple";
ctx.fill();

ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(400, 200);
ctx.strokeStyle = "green";
ctx.lineWidth = 4;
ctx.stroke();

ctx.font = "24px Arial";
ctx.fillStyle = "yellowgreen";
ctx.fillText("HTML5 Canvas", 200, 260);
