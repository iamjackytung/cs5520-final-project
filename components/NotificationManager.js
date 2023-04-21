import * as Notifications from 'expo-notifications';

export async function verifyPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Insufficient permissions!', 'You need to grant notification permissions to use this app.', [{ text: 'Okay' }]);
      return false;
    }
  }
  return true;
}

// export default function NotificationManager() {

//   async function scheduleNotificationHandler() {
//     const hasPermission = await verifyPermissions();
//     if (!hasPermission) {
//       return; // return early if no permission
//     }
//     console.log("Scheduling notification...")
//     try {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "My first local notification",
//           body: "This is the first local notification we are sending!",
//           data: { url: "https://www.google.com" },
//           categoryIdentifier: "welcome"
//         },
//         trigger: {
//           seconds: 5,
//         },
//       });
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   useEffect(() => {
    
  
  
//   }, [])
  

//   return (
//     <View>
//       <Button title="Schedule a notification" onPress={scheduleNotificationHandler}/>
//     </View>
//   )
// }