import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const TOKEN_KEY = "expo_push_token_cache_v1";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    // iOS mới: nên dùng 2 cái này
    shouldShowBanner: true,
    shouldShowList: true,

    // vẫn giữ cho tương thích ngược (không bắt buộc)
    shouldShowAlert: true,

    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    console.log("Push Notifications chỉ hoạt động trên thiết bị thật.");
    return null;
  }

  // 6
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("reminders", {
      name: "Nhắc nhở",
      importance: Notifications.AndroidImportance.HIGH,
    });
    await Notifications.setNotificationChannelAsync("news", {
      name: "Tin tức",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.log("Quyền thông báo bị từ chối.");
    return null;
  }

  // lấy token
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  // Bài 8: đọc token cũ, so sánh, cập nhật nếu khác
  try {
    const oldToken = await AsyncStorage.getItem(TOKEN_KEY);
    if (oldToken !== token) {
      // giả lập gọi API cập nhật token → ở đây chỉ ghi đè
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log("Token mới đã lưu (mô phỏng gửi server).");
    } else {
      console.log("Token không đổi, không cần cập nhật.");
    }
  } catch (e) {
    console.log("Lỗi lưu token:", e);
  }

  return token;
}

/** Gửi ngay (trigger null) */
export async function scheduleNow(title: string, body: string, extra?: any) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: extra },
    trigger: null, // gửi ngay lập tức
  });
}

/** Gửi sau N giây (Bài 3/5) + có thể gán channelId */
export async function scheduleInSeconds(
  secs: number,
  title: string,
  body: string,
  extra?: any,
  channelId?: string
) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: extra },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secs,
      repeats: false, // thường là false cho bài tập
      channelId, // đặt ở trigger (Android)
    },
  });
}
