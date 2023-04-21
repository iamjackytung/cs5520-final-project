import { useState, useEffect, createContext } from "react";
import * as Notifications from "expo-notifications";
import { verifyPermissions } from "../components/NotificationManager";
import { expoProjectId } from "@env";

export const PushTokenContext = createContext();

export const PushTokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getToken() {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        return; // return early if no permission
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: expoProjectId,
      });
      console.log("Expo push token:", token["data"]);

      setToken(token["data"]);

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <PushTokenContext.Provider value={token}>
      {children}
    </PushTokenContext.Provider>
  );
};

export async function sendPushNotification(expoPushToken, title, message) {
  console.log("Started sending push notification");
  const messageObj = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: message,
    data: { data: "goes here" },
    _displayInForeground: true,
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageObj),
  });
  return;
}
