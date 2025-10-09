import { Stack } from 'expo-router';

export default function ProductsLayout() {
	return (
		<Stack>
			<Stack.Screen name="list" options={{ title: 'Danh sách sản phẩm' }} />
			<Stack.Screen name="form" options={{ title: 'Thêm/Cập nhật sản phẩm' }} />
			<Stack.Screen name="detail" options={{ title: 'Chi tiết sản phẩm' }} />
		</Stack>
	);
}
