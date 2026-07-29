import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { NOTIFICATION_CHANNEL_ID } from "../constants/storage";

export async function prepareNotifications(showMessage) {
  if (Platform.OS === "web") {
    showMessage(
      "نوتیفیکیشن گوشی",
      "نوتیفیکیشن واقعی روی گوشی تست می‌شود. برای وب فقط ظاهر برنامه نمایش داده می‌شود."
    );
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: "Study Reminders",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#2563eb",
      sound: "default",
    });
  }

  const permission = await Notifications.getPermissionsAsync();
  let finalStatus = permission.status;

  if (finalStatus !== "granted") {
    const request = await Notifications.requestPermissionsAsync();
    finalStatus = request.status;
  }

  if (finalStatus !== "granted") {
    showMessage("مجوز لازم است", "برای ارسال یادآور، باید اجازه نوتیفیکیشن را بدهی.");
    return false;
  }

  return true;
}

export function buildDateTrigger(date) {
  if (Notifications.SchedulableTriggerInputTypes?.DATE) {
    return {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
      channelId: NOTIFICATION_CHANNEL_ID,
    };
  }

  return date;
}

export function buildTimeIntervalTrigger(seconds) {
  if (Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL) {
    return {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
      channelId: NOTIFICATION_CHANNEL_ID,
    };
  }

  return { seconds };
}

export default Notifications;
