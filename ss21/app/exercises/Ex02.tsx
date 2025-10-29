import React from "react";
import { Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import { scheduleNow } from "../../lib/notifications";

export default function Ex02() {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex02 – Local Notification cơ bản
      </Text>
      <NotifyButton
        title="Gửi ngay"
        onPress={() => scheduleNow("Ex02", "Local notification đơn giản")}
      />
    </View>
  );
}
