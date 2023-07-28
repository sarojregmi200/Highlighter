import Browser from "webextension-polyfill";

export function initMessages() {
  Browser.runtime.onMessage.addListener(handleMessage);
}

function handleMessage({
  request: { msg, payload },
  sender,
  response,
}: {
  request: {
    msg: string;
    payload?: any;
  };
  sender: Browser.Runtime.MessageSender;
  response: any;
}) {}
