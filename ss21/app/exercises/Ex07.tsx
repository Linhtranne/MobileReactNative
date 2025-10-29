import React from "react";
import { Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import { scheduleInSeconds } from "../../lib/notifications";

export default function Ex07() {
  const sendRouteNotif = async () => {
    await scheduleInSeconds(
      3,
      "Đi tới Details",
      "Tap để mở chi tiết Item 123",
      { screen: "Details", itemId: 123 }, // data để _layout bắt và điều hướng
      "reminders"
    );
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex07 – Tap → Navigate
      </Text>
      <NotifyButton title="Gửi thông báo điều hướng" onPress={sendRouteNotif} />
      <Text>→ Tap thông báo sau 3s để sang Details.</Text>
    </View>
  );
}
