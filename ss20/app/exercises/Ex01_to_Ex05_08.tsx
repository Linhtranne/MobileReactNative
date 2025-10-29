import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const CLOUD_NAME = "duongleeaaa";
export const UPLOAD_PRESET = "ss20";

export default function Ex01ToEx05Screen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [capturedImage, setCapturedImage] = useState<{
    uri: string;
    type?: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [camType, setCamType] = useState<CameraType>(CameraType.back);
  const [flash, setFlash] = useState<FlashMode>(FlashMode.off);

  const cameraRef = useRef<Camera | null>(null);

  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.9,
        skipProcessing: false,
      });
      setCapturedImage({
        uri: photo.uri,
        type: "image/jpeg",
      });
    } catch (err: any) {
      console.error("Camera error:", err);
      Alert.alert("Lỗi", "Không thể chụp ảnh. Vui lòng thử lại.");
    }
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const compressBeforeUpload = async (uri: string) => {
    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 1080 } }],
        {
          compress: 0.7, // 0..1
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );
      return manipulated.uri;
    } catch (e) {
      console.warn("Manipulate failed, fallback original:", e);
      return uri;
    }
  };

  const uploadToCloudinary = async () => {
    if (!capturedImage) return;

    setIsUploading(true);
    try {
      const processedUri = await compressBeforeUpload(capturedImage.uri);

      const formData = new FormData();
      formData.append("file", {
        uri: processedUri,
        type: "image/jpeg",
        name: "photo.jpg",
      } as any);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Cloudinary secure_url:", response.data.secure_url);
      Alert.alert("Thành công", "Upload ảnh thành công!", [
        {
          text: "OK",
          onPress: () => {
            setCapturedImage(null);
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Lỗi", "Upload thất bại! Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Đang kiểm tra quyền camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Yêu cầu quyền Camera</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
          disabled={isUploading}
        >
          <Text style={styles.buttonText}>YÊU CẦU QUYỀN CAMERA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: capturedImage.uri }}
          style={styles.preview}
          resizeMode="contain"
        />
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={retakePicture}
            disabled={isUploading}
          >
            <MaterialIcons name="replay" size={24} color="#007AFF" />
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Chụp lại
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={uploadToCloudinary}
            disabled={isUploading}
          >
            {isUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="cloud-upload" size={24} color="#fff" />
                <Text style={styles.buttonText}>Tiếp tục</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Camera
        ref={(r) => (cameraRef.current = r)}
        style={styles.camera}
        type={camType}
        flashMode={flash}
        ratio="16:9"
      >
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topButton}
            onPress={() => {
              setFlash((prev) =>
                prev === FlashMode.off
                  ? FlashMode.on
                  : prev === FlashMode.on
                  ? FlashMode.auto
                  : FlashMode.off
              );
            }}
          >
            {flash === FlashMode.off && (
              <MaterialIcons name="flash-off" size={24} color="#fff" />
            )}
            {flash === FlashMode.on && (
              <MaterialIcons name="flash-on" size={24} color="#fff" />
            )}
            {flash === FlashMode.auto && (
              <MaterialIcons name="flash-auto" size={24} color="#fff" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topButton}
            onPress={() =>
              setCamType((t) =>
                t === CameraType.back ? CameraType.front : CameraType.back
              )
            }
          >
            <MaterialIcons name="flip-camera-android" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <MaterialIcons name="camera" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  cameraContainer: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1 },

  topBar: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topButton: {
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },

  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 40,
  },
  captureButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  preview: { width: "100%", height: "70%", marginBottom: 20, borderRadius: 12 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
  },

  title: { fontSize: 18, fontWeight: "600", marginBottom: 20 },
  text: { fontSize: 16, color: "#666", textAlign: "center" },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 140,
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600", marginLeft: 8 },
  secondaryButtonText: { color: "#007AFF" },
});
