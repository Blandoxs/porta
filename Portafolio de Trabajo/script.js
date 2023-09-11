const colorInput = document.getElementById("color-input");
const selectedColor = document.getElementById("selected-color");
const monochromatic = document.getElementById("monochromatic");
const complementary = document.getElementById("complementary");
const splitComplementary = document.getElementById("split-complementary");
const analogous = document.getElementById("analogous");

colorInput.addEventListener("input", updateColors);

function updateColors() {
    const hexColor = colorInput.value;
    selectedColor.textContent = hexColor;
    monochromatic.innerHTML = "";
    complementary.innerHTML = "";
    splitComplementary.innerHTML = "";
    analogous.innerHTML = "";
    

    const rgbColor = hexToRgb(hexColor);

    // Monochromatic
    for (let i = 0; i < 5; i++) {
        const shade = lightenDarkenColor(rgbColor, i * 20);
        createColorBox(monochromatic, shade);
    }

    // Complementary
    const complementaryColor = complementaryColorRgb(rgbColor);
    createColorBox(complementary, complementaryColor);

    // Split Complementary
    const splitColors = splitComplementaryColors(rgbColor);
    createColorBox(splitComplementary, splitColors[0]);
    createColorBox(splitComplementary, splitColors[1]);

    // Analogous
    const analogousColors = analogousColorsRgb(rgbColor);
    for (const color of analogousColors) {
        createColorBox(analogous, color);
    }
}

function hexToRgb(hex) {
    hex = hex.slice(1);
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function lightenDarkenColor(color, percent) {
    const factor = percent / 100;
    const newColor = {
        r: Math.min(255, color.r * (1 + factor)),
        g: Math.min(255, color.g * (1 + factor)),
        b: Math.min(255, color.b * (1 + factor))
    };
    return `rgb(${newColor.r.toFixed(0)}, ${newColor.g.toFixed(0)}, ${newColor.b.toFixed(0)})`;
}

function complementaryColorRgb(color) {
    return `rgb(${255 - color.r}, ${255 - color.g}, ${255 - color.b})`;
}

function splitComplementaryColors(color) {
    const complementary = complementaryColorRgb(color);
    const angle = 30; // Angle between the colors
    const color1 = rotateColor(color, angle);
    const color2 = rotateColor(color, -angle);
    return [complementary, color1, color2];
}

function rotateColor(color, angle) {
    const r = color.r;
    const g = color.g;
    const b = color.b;
    const angleRad = (angle * Math.PI) / 180;
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
    const newR = r * cos - b * sin;
    const newB = r * sin + b * cos;
    return `rgb(${newR.toFixed(0)}, ${g.toFixed(0)}, ${newB.toFixed(0)})`;
}

function analogousColorsRgb(color) {
    const angle = 30; // Angle between the colors
    const colors = [];
    for (let i = -2; i <= 2; i++) {
        const rotatedColor = rotateColor(color, i * angle);
        colors.push(rotatedColor);
    }
    return colors;
}

function createColorBox(container, color) {
    const colorBox = document.createElement("div");
    colorBox.style.backgroundColor = color;
    colorBox.className = "color-box";
    container.appendChild(colorBox);
}
// Obtener elementos del DOM
const cuadroColores = document.getElementById('colores');
const subventana = document.getElementById('subventana');
const cerrarSubventanaBtn = document.getElementById('cerrarSubventana');
const iframeSubventana = document.getElementById('iframeSubventana');

// Mostrar la subventana cuando se hace clic en el cuadro "Colores"
cuadroColores.addEventListener('click', () => {
    subventana.style.display = 'block';
    iframeSubventana.src = 'colores.html'; // Cargar colores.html en el iframe
});

// Cerrar la subventana cuando se hace clic en el botón de cerrar
cerrarSubventanaBtn.addEventListener('click', () => {
    subventana.style.display = 'none';
    iframeSubventana.src = ''; // Vaciar la URL del iframe
});
// Obtener el elemento color-input

// Establecer el valor inicial del color picker
colorInput.value = "#FF0000"; // Puedes cambiar este valor al color deseado

// Llamar al evento input del color picker para que se actualicen los colores al cargar la página
colorInput.dispatchEvent(new Event('input'));


// Mostrar el color picker automáticamente al cargar la página
colorInput.click();
