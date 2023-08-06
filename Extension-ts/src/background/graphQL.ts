import { refreshSecrets, secrets } from "./secrets";

async function sendGraphQlRequest(requestBody: { query: any }) {
  const { authToken } = await refreshSecrets();
  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const response = await fetch(secrets.apiEndPoint, {
      method: "post",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log(
        "The request failed with status ",
        response.status,
        "And message ",
        response.body
      );
      return {};
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while sending the request", error);
  }
}

// fetch the user settings i.e topics and colors
export async function getUserSettings() {
  try {
  } catch (error) {
    console.log("ErrorOccured", error);
  }
}

export async function getUser(): Promise<any | boolean> {
  try {
    const { data } = await sendGraphQlRequest({
      query: `
      query MyQuery {
        listUsers{
          items{
            settings{
              colors
              topics
            }
            active{
              topic
              color
              pen
              background
              underline
            }
          }
        }
      } 
      `,
    });

    if (!data || data.listUsers.items.length <= 0) return false;
    const {
      listUsers: {
        items: [
          {
            active: { topic, color, pen, background, underline },
            settings: { colors, topics },
          },
        ],
      },
    } = await data;

    return {
      topic,
      color,
      pen,
      background,
      underline,
      colors,
      topics,
    };
  } catch (e) {
    console.log("Error while fetching the user", e);
    return false;
  }
}

export async function getHighlights(): Promise<any | boolean> {
  try {
    const {
      data: {
        listHighlights: { items },
      },
    } = await sendGraphQlRequest({
      query: `
      query listHighlights{
        listHighlights{
          items{
            id
            time
            topic
            data
            color
            htmlMarkup
            domain
            xpath
          }
        }
      }
      `,
    });
    if (items.length <= 0 || !items) return false;

    return items;

    return {};
  } catch (e) {
    console.log("Error while fetching the user", e);
  }
}

export async function createHighlight({
  xpath,
  data,
  color,
  domain,
  time,
  topic,
  htmlMarkup,
}: {
  xpath: string;
  data: string;
  color: string;
  domain: string;
  time: string;
  topic: string;
  htmlMarkup: string;
}): Promise<{ id: string } | boolean> {
  try {
    const response = await sendGraphQlRequest({
      query: `
      mutation MyMutation {
        createHighlight(input: {color: "${color}", data: ${JSON.stringify(
        data
      )}, domain: ${JSON.stringify(domain)}, htmlMarkup: ${JSON.stringify(
        htmlMarkup
      )}, time: "${time}", topic: "${topic}", xpath: "${xpath}"}) {
          id
        }
      }
      `,
    });

    if (!response || !response?.data?.createHighlight) return false;

    return { id: response.data.createHighlight.id };
  } catch (e) {
    console.log("Error while fetching the user", e);
  }
}

export async function updateHighlight({
  id,
  xpath,
}: {
  id: string;
  xpath: string;
}) {
  try {
    await sendGraphQlRequest({
      query: `
      mutation MyMutation {
        updateHighlight(input:{id: "${id}", xpath: "${xpath}"}){
          id
        }
      }
      `,
    });
  } catch (e) {
    console.log("Error while fetching the user", e);
  }
}

export async function deleteAllHighlights(ids: []) {
  ids.forEach((id) => {
    sendGraphQlRequest({
      query: `
      mutation MyMutation {
        deleteHighlight(input: {id: "${id}"}) {
          id
        }
      }
      `,
    });
  });
}

type item = "pen" | "background" | "underline" | "color" | "topic";
export async function updateActiveState(item: item, updatedValue: any) {
  try {
    if (item === "topic" || item === "color")
      return await sendGraphQlRequest({
        query: `
      mutation MyMutation {
        updateActive(input:{id: "${secrets.activeId.trim()}", ${item}: "${updatedValue}"}){
          id
        }
      }
      `,
      });

    await sendGraphQlRequest({
      query: `
      mutation MyMutation {
        updateActive(input:{id: "${secrets.activeId.trim()}", ${item}: ${updatedValue}}){
          id
        }
      }
      `,
    });
  } catch (e) {
    console.log("Error while fetching the user", e);
  }
}

type settingItems = "colors" | "topics";
export async function addSettings(items: settingItems, newValue: string) {
  try {
    await sendGraphQlRequest({
      query: `
    mutation MyMutation {
      updateSettings(input:{id: "${secrets.settingsId.trim()}", ${items}: ${newValue}}){
        id
      }
    }
    `,
    });
  } catch (e) {
    console.log("Error while fetching the user", e);
  }
}
