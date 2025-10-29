import React, { useState } from "react";
import { Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import { registerForPushNotificationsAsync } from "../../lib/notifications";

export default function Ex04() {
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    const t = await registerForPushNotificationsAsync();
    setToken(t ?? null);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex04 – Lấy Expo Push Token
      </Text>
      <NotifyButton title="Lấy token" onPress={getToken} />
      <Text selectable style={{ marginTop: 8 }}>
        Token: {token ?? "(chưa có – chạy trên thiết bị thật)"}
      </Text>
      <Text style={{ marginTop: 8 }}>
        Thử thách: copy token và test tại Expo Push Tool.
      </Text>
    </View>
  );
}
