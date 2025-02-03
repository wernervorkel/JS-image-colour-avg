# Image Dominant Colour Finder

This is a simple web application that allows users to upload an image, calculates its dominant colour, and displays a pie chart of the top 10 most frequent colours in the image. The app also shows basic image details, including dimensions and the name of the uploaded file.

## Features

- **Image Upload**: Users can either drag and drop an image into the designated drop area or use a file input to select an image.
- **Dominant Colour**: The app calculates the most frequent colour in the image (ignoring pure black and white).
- **Top 10 Colours**: Displays the top 10 most frequent colours as a pie chart.
- **Image Information**: Displays the image name and its dimensions (width and height in pixels).
- **Interactive Chart**: Uses Chart.js to display the distribution of the top 10 colours in the uploaded image.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge).
- Basic understanding of HTML, JavaScript, and Canvas API.

## Setup

1. Clone or download the repository.
2. Open the `index.html` file in a web browser.
3. Alternatively, serve the application using any static file server or from a local development environment.

## Files

- `index.html`: Contains the basic HTML structure and the required elements for the image upload, image view, and chart.
- `script.js`: JavaScript file containing the main logic for handling file upload, image processing, and chart rendering.
- `style.css`: Styling for the layout and visual appearance (not included in the provided code but assumed to exist in the context).

## Usage

1. **Upload an Image**:

   - Either drag and drop an image file onto the designated drop area, or click on the "Upload" button to select an image from your file system.

2. **Image Processing**:
   - Once the image is uploaded, the app processes the image and calculates its dominant colour, ignoring pure black and white.
   - The dominant colour is displayed both as a textual value and as a background swatch in the image preview area.
3. **Top 10 Colours**:

   - A pie chart displays the top 10 most frequent colours in the image, with each section of the chart representing one of the colours and its frequency.

4. **Image Information**:
   - The app also displays the image's dimensions (width and height in pixels) and the image file's name.

## Code Overview

### HTML Elements

- `#drop-area`: The designated area where users can drag and drop an image.
- `#input-file`: An input element that allows users to select an image file.
- `#img-view`: Displays the image preview.
- `#image-name`: Displays the name of the uploaded image.
- `#pixel-count`: Displays the image dimensions.
- `#dominant-color`: Displays the dominant colour and a colour swatch.
- `#dominant-color-chart`: The canvas element where the pie chart is drawn using Chart.js.

### JavaScript Functions

1. **`handleImageUpload()`**: Handles the image upload, including setting the image preview and resetting previous values.
2. **`findDominantColor()`**: Calculates the dominant colour of the image by analysing pixel data. It also updates the chart with the top 10 colours.

3. **`roundToNearest10()`**: Rounds pixel values to the nearest multiple of 10 to reduce the complexity of the colour analysis (e.g., rounding RGB values to the nearest 10).

4. **Chart.js Integration**: The app uses Chart.js to create and update a pie chart showing the frequencies of the top 10 most dominant colours.

### Event Listeners

- `change` on the file input: Triggers the image upload process when a file is selected.
- `dragover` on the drop area: Allows for drag-and-drop functionality by preventing the default behaviour.
- `drop` on the drop area: Handles the file drop and triggers the image upload process.

## Example

Once an image is uploaded, you’ll see something like this:

- The image preview with a background showing the dominant colour.
- A label indicating the image name and dimensions.
- A pie chart displaying the top 10 dominant colours in the image.

## Dependencies

- **Chart.js**: A popular JavaScript library for creating charts. The pie chart is rendered using this library.

To include Chart.js in your project, you can add it as follows in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```
