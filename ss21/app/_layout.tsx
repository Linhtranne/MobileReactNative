import * as Notifications from "expo-notifications";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(
      (resp) => {
        const data = resp.notification.request.content.data as any;
        console.log("DATA từ notification:", data);

        // Bài 7: điều hướng nếu có screen
        if (data?.screen === "Details" && typeof data?.itemId !== "undefined") {
          router.push(`/details/${String(data.itemId)}`);
        }
      }
    );

    return () => sub.remove();
  }, [router]);

  return <Slot />;
}
