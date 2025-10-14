import baseUrl from "@/apis/baseURL";
import EmployeeForm from "@/components/EmployeeForm";
import { DUMMY_EMPLOYEES, Employee } from "@/data/mockData";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
export default function EditEmployeeScreen() {
  const { id } = useLocalSearchParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await baseUrl.get(`/employees/${id}`);
      setEmployee(response.data.data);
    };
    fetchEmployee();
  }, [id]);

  return <EmployeeForm initialData={employee || undefined} />;
}
