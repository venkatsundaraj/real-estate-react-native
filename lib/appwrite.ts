import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectiId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectiId!)
  .setPlatform(config.platform!);

const avatar = new Avatars(client);
const account = new Account(client);

export const login = async function () {
  try {
    const redirectUri = Linking.createURL("/");

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!response) throw new Error("Create OAuth Token failed");

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      throw new Error("Create Oauth Token Failed");
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Creat OAuth Token failed");

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create session");

    return true;
  } catch (err) {
    console.error(err);
  }
};

export const logout = async function () {
  try {
    const result = await account.deleteSession("current");
    return result;
  } catch (err) {
    console.error(err);
  }
};

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name);

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
