const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");
const imageNameElement = document.getElementById("image-name");
const pixelCountElement = document.getElementById("pixel-count");
const dominantColorElement = document.getElementById("dominant-color");
const ctx = document.getElementById('dominant-color-chart').getContext('2d');

let chartInstance = null;

inputFile.addEventListener("change", (event) => {
    event.preventDefault();
});

const handleImageUpload = () => {
  const selectedImage = inputFile.files[0];
  if (!selectedImage || !selectedImage.type.startsWith('image')) {
    alert('Please upload a valid image file!');
    return;
  }
  const imageUrl = URL.createObjectURL(selectedImage);

  imageView.style.backgroundImage = "";
  imageView.textContent = "";
  imageView.style.border = "2px dashed #535e82";
  imageNameElement.textContent = "Uploading image...";
  pixelCountElement.textContent = "";
  dominantColorElement.textContent = "";
  dominantColorElement.style.backgroundColor = "transparent";

  if (chartInstance) {
    chartInstance.destroy();
  }

  imageView.style.backgroundImage = `url(${imageUrl})`;
  imageView.style.border = "none";

  imageNameElement.textContent = selectedImage.name;

  const img = new Image();
  img.onload = () => {
    const width = img.width;
    const height = img.height;
    pixelCountElement.textContent = `Image dimensions: ${width} x ${height} pixels`;
    findDominantColor(img);
  };
  img.src = imageUrl;
}

const findDominantColor = (image) => {
  // Create a canvas to get pixel data
  const canvas = document.createElement("canvas");
  const ctxCanvas = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;

  ctxCanvas.drawImage(image, 0, 0, image.width, image.height);

  const imageData = ctxCanvas.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  const colorCount = {};

  for (let i = 0; i < pixels.length; i += 4) {
    const r = roundToNearest10(pixels[i]);
    const g = roundToNearest10(pixels[i + 1]);
    const b = roundToNearest10(pixels[i + 2]);
    const rgb = `rgb(${r},${g},${b})`;

    if ((r === 255 && g === 255 && b === 255) || (r === 0 && g === 0 && b === 0)) {
      continue;
    }

    if (colorCount[rgb]) {
      colorCount[rgb]++;
    } else {
      colorCount[rgb] = 1;
    }
  }

  const sortedColors = Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const dominantColor = sortedColors[0][0];
  dominantColorElement.textContent = `Dominant color: ${dominantColor}`;
  imageView.style.backgroundColor = dominantColor;
  console.log('sortedColors'+sortedColors)

  const labels = sortedColors.map(color => {
    console.log('test ' + color);
    return color[0]});
  const data = sortedColors.map(color => color[1]);

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Color Frequency',
        data: data,
        backgroundColor: labels,
        borderColor: labels,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

const roundToNearest10 = (value) =>{
  if (value < 255 && value > 0) {
    if (value > 250) return 250;
    if (value < 10) return 10;
    return Math.round(value / 10) * 10;
  }
  return value;
}

dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
});

dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  inputFile.files = event.dataTransfer.files;
  handleImageUpload();
});
