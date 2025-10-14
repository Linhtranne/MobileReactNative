import { appClient } from "@/utils/appClient";
import { BaseResponse, PaginationResponse } from "@/utils/response-data";

export type PositionStatus = "ACTIVE" | "INACTIVE";
export const getData = async <T>(): Promise<BaseResponse<T>> => {
  try {
    const res = await appClient.get<BaseResponse<T>>("/api/v1/positions");
    return res.data;
  } catch (error) {
    console.log("lỗi", error);
    throw error;
  }
};

export interface CreatePositionRequest {
  positionName: string;
  description?: string;
  positionStatus: PositionStatus;
}

export const addPosition = async (payload: CreatePositionRequest) => {
  try {
    const res = await appClient.post("/api/v1/positions", payload);
    return res.data;
  } catch (error) {
    console.log("lỗi addPosition", error);
    throw error;
  }
};

export const getPositionById = async (id: number) => {
  const res = await appClient.get(`/api/v1/positions/${id}`);
  return res.data;
};

export const updatePosition = async (
  id: number,
  payload: CreatePositionRequest
) => {
  const res = await appClient.put(`/api/v1/positions/${id}`, payload);
  return res.data;
};

export const deletePosition = async (id: number) => {
  const res = await appClient.delete(`/api/v1/positions/${id}`);
  return res.data;
};
