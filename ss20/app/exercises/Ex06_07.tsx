import axios from "axios";
import { ResizeMode, Video } from "expo-av";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { CLOUD_NAME, UPLOAD_PRESET } from "./Ex01_to_Ex05_08";

type Screen = "select" | "camera" | "preview";
type MediaKind = "image" | "video";

export default function Ex06() {
  const [screen, setScreen] = useState<Screen>("select");

  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaKind, setMediaKind] = useState<MediaKind>("image");

  const [hasCamPermission, setHasCamPermission] = useState<boolean | null>(
    null
  );
  const [hasMicPermission, setHasMicPermission] = useState<boolean | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const cameraRef = useRef<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);

  const [captureMode, setCaptureMode] = useState<MediaKind>("image");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermissionsAsync();
      setHasCamPermission(cam.status === "granted");

      const mic = await Camera.requestMicrophonePermissionsAsync();
      setHasMicPermission(mic.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });
    setMediaUri(photo.uri);
    setMediaKind("image");
    setScreen("preview");
  };

  const startRecording = async () => {
    if (!cameraRef.current) return;
    try {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync({
        maxDuration: 30,
        quality: "480p",
      });
      setIsRecording(false);
      if (video?.uri) {
        setMediaUri(video.uri);
        setMediaKind("video");
        setScreen("preview");
      }
    } catch (e) {
      setIsRecording(false);
      Alert.alert("Lỗi", "Không thể bắt đầu quay.");
    }
  };

  const stopRecording = () => {
    if (!cameraRef.current) return;
    cameraRef.current.stopRecording();
  };

  const pickFromLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Cần cấp quyền thư viện!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setMediaUri(asset.uri);
      setMediaKind("image");
      setScreen("preview");
    }
  };

  const uploadToCloudinary = async () => {
    if (!mediaUri) return;
    setLoading(true);

    try {
      const isVideo = mediaKind === "video";
      const form = new FormData();
      form.append("file", {
        uri: mediaUri,
        type: isVideo ? "video/mp4" : "image/jpeg",
        name: isVideo ? "upload.mp4" : "upload.jpg",
      } as any);
      form.append("upload_preset", UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;
      const res = await axios.post(url, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("secure_url:", res.data.secure_url);
      Alert.alert("Upload thành công!");
      setScreen("select");
      setMediaUri(null);
    } catch (e) {
      Alert.alert("Upload thất bại! Thử lại nhé.");
    } finally {
      setLoading(false);
    }
  };

  if (screen === "select") {
    return (
      <View style={styles.container}>
        <Button
          title="Chụp / Quay bằng Camera"
          onPress={() => setScreen("camera")}
        />
        <View style={{ height: 16 }} />
        <Button title="Chọn từ Thư viện" onPress={pickFromLibrary} />
      </View>
    );
  }

  if (screen === "camera") {
    if (hasCamPermission === false) {
      return (
        <View style={styles.center}>
          <Button
            title="Không có quyền Camera"
            onPress={() => setScreen("select")}
          />
        </View>
      );
    }
    if (captureMode === "video" && hasMicPermission === false) {
      return (
        <View style={styles.center}>
          <Button
            title="Không có quyền Micro"
            onPress={() => setScreen("select")}
          />
        </View>
      );
    }

    return (
      <View style={styles.flex}>
        <Camera
          ref={(r) => (cameraRef.current = r)}
          style={styles.flex}
          type={type}
          ratio="16:9"
        />
        <View style={styles.row}>
          <Button
            title={`Chế độ: ${captureMode === "image" ? "Ảnh" : "Video"} (đổi)`}
            onPress={() => {
              setCaptureMode((m) => (m === "image" ? "video" : "image"));
            }}
          />
          <Button
            title="Đổi camera"
            onPress={() =>
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              )
            }
          />
          {captureMode === "image" ? (
            <Button title="Chụp" onPress={takePicture} />
          ) : isRecording ? (
            <Button title="Dừng" onPress={stopRecording} />
          ) : (
            <Button title="Quay" onPress={startRecording} />
          )}
        </View>
      </View>
    );
  }

  if (screen === "preview") {
    return (
      <View style={styles.container}>
        {mediaKind === "image" ? (
          <Image
            source={{ uri: mediaUri! }}
            style={styles.previewMedia}
            resizeMode="contain"
          />
        ) : (
          <Video
            style={styles.previewMedia}
            source={{ uri: mediaUri! }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        )}

        {loading && (
          <ActivityIndicator size="large" style={{ marginVertical: 12 }} />
        )}

        <Button
          title={mediaKind === "image" ? "Chụp lại" : "Quay lại"}
          disabled={loading}
          onPress={() => setScreen("camera")}
        />
        <View style={{ height: 16 }} />
        <Button
          title="Tiếp tục (Upload)"
          disabled={loading}
          onPress={uploadToCloudinary}
        />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  previewMedia: {
    width: "100%",
    height: "70%",
    marginBottom: 20,
    borderRadius: 12,
  },
  row: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
