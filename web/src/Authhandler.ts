import { Auth } from "aws-amplify";

export const getToken = async () => {
  try {
    const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
    return token;
  } catch (e) {
    console.log(e);
    return false;
  }
};
