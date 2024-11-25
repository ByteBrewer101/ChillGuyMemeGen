

# Chill Meme Generator

A simple web-based application that allows users to create and download personalized memes with customizable backgrounds, text, and images.

## Key Features:



### 1. **Image Selection**
   - **Predefined Images**:
     - Two preloaded images (`Chill Guy` and `Chill Girl`) are available for selection.
     - Users can switch between these images with the **"Guy"** and **"Girl"** buttons.
   - **Custom Background Image**:
     - Users can upload a custom image to set as the background using the file input. This is processed as a base64-encoded image and displayed in the background.

### 2. **Text Customization**
   - Users can input custom text that will appear on the meme.
   - The text is editable via an input box, and once submitted, it is displayed on the canvas.
   - The font size of the text can be adjusted using a slider (ranging from a small to a large size).

### 3. **Image Download**
   - After the user customizes the meme with their desired background, image, and text, they can download the final meme as a PNG image.
   - The `Download Meme!` button triggers the download, and the image is generated using `Konva.js` (HTML5 canvas library) to capture the current stage (canvas state).

### 4. **Canvas Rendering and Animation**
   - The app uses `react-konva` and `Konva.js` to render the interactive canvas where the user can see their custom meme.
   - The meme consists of:
     - A **background rectangle** (either a solid color or an image).
     - A **draggable image** (`Chill Guy` or `Chill Girl`).
     - A **draggable text element** that displays the custom text.
   - The elements (image and text) can be dragged around the canvas, allowing users to position them as desired.



---

## Technologies Used:

- **React**: For building the UI components and managing state.
- **Konva.js**: For canvas rendering and interaction (used through `react-konva`).
- **use-image**: To load and display images (both predefined and uploaded).
- **Tailwind CSS**: For styling the user interface.
- **JavaScript/TypeScript**: For all core logic and functionality.
- **FileReader API**: For reading and uploading custom background images.
  
---

## How to Run the Project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chill-meme-generator.git
   cd chill-meme-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:3000` to see the app in action.

---



## Future Improvements:

- Add more image options to the meme creator.
- Implement more advanced text formatting options (e.g., font style, color).
- Allow users to add multiple text elements to the meme.
- Optimize image upload size and performance.
- Add a text wrapping feature for longer text inputs.

---

## License:

This project is open-source and available under the MIT License.

---

Feel free to customize and extend the app with additional features and styles!
