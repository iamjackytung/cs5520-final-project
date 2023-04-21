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

export async function sendPushNotification({
  expoPushToken,
  title,
  message,
  data = {},
  sound = "default",
  displayInForeground = true,
}) {
  // Check if the expoPushToken is valid
  if (!expoPushToken || typeof expoPushToken !== "string") {
    console.error("Invalid Expo push token:", expoPushToken);
    return;
  }

  const messageObj = {
    to: expoPushToken,
    sound,
    title,
    body: message,
    data,
    _displayInForeground: displayInForeground,
  };

  try {
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to send push notification:", errorText);
      return;
    }
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}
