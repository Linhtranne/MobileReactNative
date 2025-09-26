import React from 'react';
import { ScrollView } from 'react-native';
import UserInfoCard from '../../components/UserInfoCard';

const UserListScreen: React.FC = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f2f2f2', padding: 16 }}>
      <UserInfoCard
        name="Trần Văn An"
        avatarUrl="https://i.pravatar.cc/150?u=1"
        email="trab.an@example.com"
      />
      <UserInfoCard
        name="Lý Thị Bình"
        avatarUrl="https://i.pravatar.cc/150?u=2"
        email="ly.binh@example.com"
      />
    </ScrollView>
  );
};

export default UserListScreen;
