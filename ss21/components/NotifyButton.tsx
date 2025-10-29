import React from "react";
import { Button, View } from "react-native";

type Props = { title: string; onPress: () => void };
export default function NotifyButton({ title, onPress }: Props) {
  return (
    <View style={{ marginVertical: 8 }}>
      <Button title={title} onPress={onPress} />
    </View>
  );
}
