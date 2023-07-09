const colorState = {
  colors: [], // contains the colors
  activeColor: "#E9FF32",
};

const colorContainer = document.querySelector(".colors");

if (colorContainer) {
  // updating the ui
  tiggerUiColorsUpdate();
}

// adds the colors in ui by fetching data from the global state
function tiggerUiColorsUpdate() {
  // getting the global state
  getGlobalState().then(
    ({ colors, activeColor }) => {
      updateColorUi({
        colors: colors,
        activeColor: activeColor,
      });
      colorState.activeColor = activeColor;
      colorState.colors = colors;

      //   setting the css active color variable
      document
        .querySelector(":root")
        .style.setProperty("--active-color", activeColor);
    },
    (e) => {
      console.log("Cannot get global state");
      return "err";
    }
  );
}

function updateColorUi(state) {
  // clearing the previous colors
  colorContainer.innerHTML = "";

  //   if no colors found
  if (state.colors.length < 1) return;

  state.colors.forEach((color, index) => {
    const newColor = createColor(color, color === state.activeColor);

    // adding a event listener to handle updating color on click
    newColor.addEventListener("click", updateActiveColor(index));
    colorContainer.appendChild(newColor);
  });
}

// gets the data from the background script
function getGlobalState() {
  const promiss = browser.runtime.sendMessage({ msg: "getColors" });
  return promiss;
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
