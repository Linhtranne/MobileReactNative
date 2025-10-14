import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPosition: { fontSize: 14, color: "gray", marginTop: 4 },
  itemActions: { flexDirection: "row", alignItems: "center" },
  emptyText: {
    color: "gray",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
