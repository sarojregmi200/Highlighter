function convertToRGB(name) {
  // creating a temp div to apply color
  const temp = document.createElement("div");
  temp.style.background = name;
  document.body.appendChild(temp);
  // getting the computed style
  const rgbValue = window.getComputedStyle(temp).getPropertyValue("background");
  // extracting rgb value in array
  // from a string
  const rgbArr = rgbValue.match(/\d+/g).map(Number);
  return rgbArr;
}

function compareContrast(color1, color2) {
  // luminiousity of color 1
  const l1 = getRelativeLuminosity(...color1);
  const l2 = getRelativeLuminosity(...color2);
}

function luminosity(r, g, b) {}
