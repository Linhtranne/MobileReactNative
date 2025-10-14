// src/components/Position.tsx
import { positionStyles } from "@/styles/position.styles";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PositionType } from "@/interface/PositionType";

interface PositionProps {
  position: PositionType;
  onEdit?: (p: PositionType) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void; //
}

export default function Position({
  position,
  onEdit,
  onDelete,
  onView,
}: PositionProps) {
  const getStatusText = () => {
    if (position.positionStatus === "ACTIVE") return "Đang hoạt động";
    if (position.positionStatus === "INACTIVE") return "Ngừng hoạt động";
    return "Không xác định";
  };

  return (
    <View style={positionStyles.taskContainer}>
      <View style={positionStyles.leftContainer}>
        <Text style={positionStyles.taskName}>{position.positionName}</Text>
        <View style={positionStyles.taskStatusContainer}>
          <Text style={positionStyles.taskStatusText}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={positionStyles.rightContainer}>
        <Pressable hitSlop={8} onPress={() => onView?.(position.id)}>
          <Ionicons name="eye" size={22} color="#0a7" />
        </Pressable>

        <Pressable
          hitSlop={8}
          style={{ marginLeft: 12 }}
          onPress={() => onEdit?.(position)}
        >
          <Ionicons name="pencil" size={22} color="blue" />
        </Pressable>

        <Pressable
          hitSlop={8}
          style={{ marginLeft: 12 }}
          onPress={() => onDelete?.(position.id)}
        >
          <Ionicons name="trash-sharp" size={22} color="red" />
        </Pressable>
      </View>
    </View>
  );
}
