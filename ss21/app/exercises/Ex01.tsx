import React, { useState } from "react";
import { Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import {
  registerForPushNotificationsAsync,
  scheduleNow,
} from "../../lib/notifications";

export default function Ex01() {
  const [granted, setGranted] = useState<boolean | null>(null);

  const askAndSend = async () => {
    const token = await registerForPushNotificationsAsync();
    setGranted(!!token);
    await scheduleNow("Hello từ Ex01", "Gửi ngay với trigger=null");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex01 – Xin quyền & Gửi ngay
      </Text>
      <NotifyButton title="Gửi ngay" onPress={askAndSend} />
      <Text>
        Quyền/Token: {granted === null ? "?" : granted ? "OK" : "Chưa có"}
      </Text>
    </View>
  );
}
