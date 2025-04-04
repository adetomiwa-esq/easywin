const canvas = document.getElementById("scratch-effect");
const playBtn = document.querySelector(".play");
const context = canvas.getContext("2d");
const alertOverlay = document.querySelector(".alert-overlay");
const closeAlert = document.querySelector(".close-alert");

const init = () => {
  canvas.style.display = "block";
  context.fillStyle = "#FFD700";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

const canvasResize = () => {
  canvas.width = Math.min(window.innerWidth * 0.6, 280);
  canvas.height = canvas.width;
  //init();
};

let isDragging = false;

// scratch function
const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(x, y, canvas.width * 0.06, 0, 2 * Math.PI);
  context.fill();
  checkScratchCompletion();
};

// function add event listener to check if user is pressing down on mouse
canvas.addEventListener("mousedown", (e) => {
  isDragging = true;

  scratch(e.offsetX, e.offsetY);
});

// function adding mouse move to canvas
canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    scratch(e.offsetX, e.offsetY);
  }
});

// function to check if user is not pressing down on mouse
canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

// function to if mouse is no longer on canvas
canvas.addEventListener("mouseleave", () => {
  isDragging = false;
});

// function to check scratch completion
const checkScratchCompletion = () => {
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let transparentPixels = 0;
  const totalPixels = imageData.data.length / 4;

  for (let i = 3; i < imageData.data.length; i += 4) {
    if (imageData.data[i] === 0) {
      transparentPixels++;
    }
  }

  if (transparentPixels / totalPixels > 0.83) {
    canvas.removeEventListener("mousedown", scratch);
    canvas.removeEventListener("mousemove", scratch);
    alertOverlay.classList.add("display-alert");
  }
};

// event listener to start scratch and win promo
playBtn.addEventListener("click", () => {
  init();
});

// function to remove alert after playing game
closeAlert.addEventListener("click", () => {
  alertOverlay.classList.remove("display-alert");
  location.reload();
  canvas.style.display = "none";
});

window.addEventListener("resize", canvasResize);
