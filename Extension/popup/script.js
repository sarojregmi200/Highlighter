const colorState = {
  colors: [], // contains the colors
  activeColor: "#E9FF32",
};

const colorContainer = document.querySelector(".colors");

if (colorContainer) {
  // updating the ui
  updateUiColors();
}

// adds the colors in ui by fetching data from the global state
function updateUiColors() {
  // getting the global state
  getGlobalState();

  // clearing the previous colors
  colorContainer.innerHTML = "";

  print(colorState.colors.length);
  //   if no colors found
  if (colorState.colors.length < 1) return;

  colorState.colors.forEach((color, index) => {
    const newColor = createColor(color, color === colorState.activeColor);

    print(newColor);
    // adding a event listener to handle updating color on click
    newColor.addEventListener("click", updateActiveColor(index));
    colorContainer.appendChild(newColor);
  });
}

// gets the data from the background script
function getGlobalState() {
  const request = browser.runtime.sendMessage({ msg: "getColors" });
  request.then(
    (response) => {
      colorState.activeColor = response.activeColor;
      colorState.colors = response.colors;
    },
    (e) => {
      console.log("Cannot get global state");
    }
  );
}

// creates a individual element with color class and active status
// returns a dom element
function createColor(colorCode, activeStatus) {
  const div = document.createElement("div");
  div.classList.add("color");

  //   if the current color is active adding a active class
  if (activeStatus) div.classList.add("active");
  div.style.background = colorCode;
  return div;
}

// updates the active color to the provided index of the color from the global state color array
function updateActiveColor(index) {}

// sends a console log to the background scritp console
function print(msg) {
  chrome.extension.getBackgroundPage().console.log(msg);
}
