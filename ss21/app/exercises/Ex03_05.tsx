import React from "react";
import { Alert, Text, View } from "react-native";
import NotifyButton from "../../components/NotifyButton";
import { scheduleInSeconds } from "../../lib/notifications";

export default function Ex03_05() {
  const sendAfter10s = async () => {
    await scheduleInSeconds(
      10,
      "Thông báo hẹn giờ",
      "Tap vào để xem chi tiết",
      { studentId: "SV001", course: "React Native" } // Bài 5: data đính kèm
    );
    Alert.alert("Đã lên lịch nhắc nhở.");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Ex03 + Ex05 – Hẹn sau 10s & data
      </Text>
      <NotifyButton title="Nhắc tôi sau 10 giây" onPress={sendAfter10s} />
      <Text>
        Khi tap vào thông báo, check console để thấy SV001 & React Native.
      </Text>
    </View>
  );
}
