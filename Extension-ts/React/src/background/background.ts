import Browser from "webextension-polyfill";

Browser.commands.onCommand.addListener(handleShortcutChange);

function handleShortcutChange(state: string): void {
  //  switch (state) {
  //   case "search":
  //     sendSearchData(state);
  //     break;
  //   case "color":
  //     // change the current color
  //     sendSearchData(state);
  //     break;
  //   case "topic":
  //     // change the topic
  //     sendSearchData(state);
  //     break;
  // }

  console.log(state);
}
