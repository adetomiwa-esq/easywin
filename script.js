// const winIcons = [
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
//   "https://easywin.ng/images/guagua/luckyworldcup/prize_img.png",
// ];

// const randomIcons = [
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
//   winIcons[Math.floor(Math.random() * winIcons.length)],
// ];

// const scratchCard = document.getElementById("scratch-card");

// scratchCard.innerHTML = randomIcons.map((icon) => `<img src=${icon}  >`);

const canvas = document.getElementById("scratch-effect");

const context = canvas.getContext("2d");

const init = () => {
  context.fillStyle = "blue";
  context.fillRect(0, 0, 300, 300);
};

let isDragging = false;
let done = false;

const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, 24, 0, 2 * Math.PI);
  context.fill();
  checkScratchCompletion();
};

canvas.addEventListener("mousedown", (e) => {
  isDragging = true;

  scratch(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    scratch(e.offsetX, e.offsetY);
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging(false);
});

canvas.addEventListener("mouseleave", () => {
  isDragging(false);
});

const checkScratchCompletion = () => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let transparentPixels = 0;
  const totalPixels = imageData.data.length / 4;

  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) {
      transparentPixels++;
    }
  }

  if (transparentPixels / totalPixels > 0.8) {
    canvas.removeEventListener("mousedown", scratch);
    canvas.removeEventListener("mousemove", scratch);
    alert("Congratulations! You have completed scratching the card.");
  }
};

init();
