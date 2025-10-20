import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPositions, fetchPositionById, createPosition, updatePosition, deletePosition } from "../api/positions";

export function usePositionsList() {
  return useQuery({
    queryKey: ["positions"],
    queryFn: fetchPositions,
  });
}

export function usePositionDetails(id) {
  return useQuery({
    queryKey: ["position", id],
    queryFn: () => fetchPositionById(id),
    enabled: !!id,
  });
}

export function useCreatePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPosition,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      // Optionally: queryClient.setQueryData(["positions"], ...)
    },
  });
}

export function useUpdatePosition(id: string | number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => updatePosition(id, values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
}

export function useDeletePosition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePosition,
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      // Optionally: queryClient.removeQueries({ queryKey: ["position", id] });
    },
  });
}
