// component Task ---------------------------------------------------

import { StyleSheet, TextStyle, ViewStyle } from "react-native";

const taskContainer: ViewStyle = {
  backgroundColor: "#FFFFFF",
  padding: 14,
  borderRadius: 8,
  width: 380,
  borderColor: "#e3e3e3ff",
  borderWidth: 2,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};

const taskName: TextStyle = {
  fontSize: 20,
  fontWeight: "700",
};

const leftContainer: ViewStyle = {
  gap: 10,
  alignItems: "flex-start",
};

const rightContainer: ViewStyle = {
  flexDirection: "row",
  gap: 10,
};

//component status ---------------------------------------------

const taskStatusContainer: ViewStyle = {
  backgroundColor: "#E0E0E0",
  paddingHorizontal: 8,
  borderRadius: 10,
  paddingVertical: 2,
};

const taskStatusText: TextStyle = {
  fontSize: 12,
};

export const positionStyles = StyleSheet.create({
  taskContainer,
  taskName,
  taskStatusContainer,
  taskStatusText,
  rightContainer,
  leftContainer,
});
