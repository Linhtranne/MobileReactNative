import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Gọi API lấy danh sách vị trí
export const getAllPosition = createAsyncThunk(
  "position/getAllPosition",
  async () => {
    const response = await axiosInstance.get("positions");

    console.log("Response: ", response);

    return response.data;
  }
);
