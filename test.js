const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("img-view");
const imageNameElement = document.getElementById("image-name");
const pixelCountElement = document.getElementById("pixel-count");
const dominantColorElement = document.getElementById("dominant-color");
const ctx = document.getElementById('dominant-color-chart').getContext('2d'); // For Chart.js

let chartInstance = null; // Store chart instance to destroy it later

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

  // Reset image preview and other elements
  imageView.style.backgroundImage = "";
  imageView.textContent = "";
  imageView.style.border = "2px dashed #535e82";
  imageNameElement.textContent = "Uploading image...";
  pixelCountElement.textContent = "";
  dominantColorElement.textContent = "";
  dominantColorElement.style.backgroundColor = "transparent"; // Reset color swatch

  // Clear chart if exists
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

  // Draw the image on the canvas
  ctxCanvas.drawImage(image, 0, 0, image.width, image.height);

  // Get the image data (array of RGBA values)
  const imageData = ctxCanvas.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Hashmap to store color frequencies
  const colorCount = {};

  // Loop through each pixel and extract the RGB value
  for (let i = 0; i < pixels.length; i += 4) {
    const r = roundToNearest10(pixels[i]);     // Red value
    const g = roundToNearest10(pixels[i + 1]); // Green value
    const b = roundToNearest10(pixels[i + 2]); // Blue value
    const rgb = `rgb(${r},${g},${b})`;

    if ((r === 255 && g === 255 && b === 255) || (r === 0 && g === 0 && b === 0)) {
      continue; // Skip white and black pixels
    }

    // Increment the color count in the hashmap
    if (colorCount[rgb]) {
      colorCount[rgb]++;
    } else {
      colorCount[rgb] = 1;
    }
  }

  // Sort colors by frequency and take top 10
  const sortedColors = Object.entries(colorCount)
    .sort((a, b) => b[1] - a[1])  // Sort by frequency
    .slice(0, 10);  // Take the top 10 colors

  // Display the dominant color (the top one)
  const dominantColor = sortedColors[0][0];
  dominantColorElement.textContent = `Dominant color: ${dominantColor}`;
  imageView.style.backgroundColor = dominantColor; // Show dominant color as swatch
  console.log('sortedColors'+sortedColors)

  // Now, update the chart with the top 10 dominant colors
  const labels = sortedColors.map(color => {
    console.log('test ' + color);
    return color[0]});
  const data = sortedColors.map(color => color[1]);

  // Create the chart
  chartInstance = new Chart(ctx, {
    type: 'pie',  // You can also use 'pie' or other types
    data: {
      labels: labels,  // Colors as labels
      datasets: [{
        label: 'Color Frequency',
        data: data,  // Frequency of colors
        backgroundColor: labels,  // Set the background to the color
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

// Helper function to round values to nearest 10
const roundToNearest10 = (value) =>{
  if (value < 255 && value > 0) {
    if (value > 250) return 250; // Ensure values close to 255 round to 250
    if (value < 10) return 10;   // Ensure values close to 0 round to 10
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
