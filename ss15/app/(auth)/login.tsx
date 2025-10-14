import baseUrl from "@/apis/baseURL";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { styles } from "../../styles/login-screen.styles";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [userLogin, setUserLogin] = useState({
    phoneNumber: "",
    password: "",
    deviceId: "",
    isRemembered: true,
  });

  const [error, setError] = useState({
    phoneNumber: "",
    password: "",
  });

  const router = useRouter();

  useEffect(() => {
    const getDeviceId = async () => {
      let deviceId = await AsyncStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = uuidv4();
        await AsyncStorage.setItem("deviceId", deviceId);
      }
      setUserLogin((prev) => ({ ...prev, deviceId }));
    };
    getDeviceId();
  }, []);

  const handleChange = (field: string, value: string) => {
    setUserLogin((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    let isValid = true;

    const newErrors = {
      phoneNumber: "",
      password: "",
    };

    if (!userLogin.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    }

    if (!userLogin.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    setError(newErrors);
    if (!isValid) return;

    try {
      const response = await baseUrl.post("/auths/login", userLogin);

      if (response.status === 201 || response.status === 200) {
        const { accessToken, refreshToken } = response.data.data;

        if (accessToken && refreshToken) {
          signIn(accessToken, refreshToken);
          Alert.alert("Success", "Logged in successfully.", [
            { text: "OK", onPress: () => router.push("/(tabs)") },
          ]);
        } else {
          Alert.alert("Error", "Tokens are missing in the server response.");
        }
      }
    } catch (apiError) {
      if (isAxiosError(apiError)) {
        Alert.alert(
          "Login failed",
          apiError.response?.data?.message ||
            "Invalid phone number or password."
        );
      } else {
        Alert.alert("Unexpected error", "Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        value={userLogin.phoneNumber}
        placeholder="Enter phone number"
        onChangeText={(text) => handleChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />
      {error.phoneNumber ? (
        <Text style={styles.error}>{error.phoneNumber}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        value={userLogin.password}
        placeholder="Enter password"
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
      />
      {error.password ? (
        <Text style={styles.error}>{error.password}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>No account yet? Register</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
