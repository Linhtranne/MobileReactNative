import React from 'react';
import { ScrollView } from 'react-native';
import BusinessCard from './businesscard';

const BusinessCardDemo: React.FC = () => {
  return (
    <ScrollView>
      <BusinessCard
        avatarUrl="https://i.pravatar.cc/150?u=reactdev"
        name="Nguyễn Văn React"
        jobTitle="Lập trình viên React Native"
        contactInfo="Email: reactdev@example.com"
      />
      <BusinessCard
        avatarUrl="https://i.pravatar.cc/150?u=designer"
        name="Trần Thị Design"
        jobTitle="UI/UX Designer"
        contactInfo="SĐT: 0123 456 789"
      />
    </ScrollView>
  );
};

export default BusinessCardDemo;
