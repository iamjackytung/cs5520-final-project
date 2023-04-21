import { useState, useEffect, createContext } from "react";
import * as Notifications from 'expo-notifications';
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

      const token = await Notifications.getExpoPushTokenAsync({ projectId: expoProjectId });
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
    <PushTokenContext.Provider value={token}>{children}</PushTokenContext.Provider>
  );
};
