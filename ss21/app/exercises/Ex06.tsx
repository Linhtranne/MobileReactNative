import React from "react";
import { Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import { scheduleInSeconds } from "../../lib/notifications";

export default function Ex06() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex06 – Android Notification Channels
      </Text>
      <Text style={{ marginBottom: 8 }}>
        Đã tạo channels reminders và news trong
        registerForPushNotificationsAsync().
      </Text>
      <NotifyButton
        title="Nhắc sau 10s (channel: reminders)"
        onPress={() =>
          scheduleInSeconds(
            10,
            "Nhắc việc",
            "Channel = reminders (HIGH)",
            { tag: "demo" },
            "reminders"
          )
        }
      />
    </View>
  );
}
