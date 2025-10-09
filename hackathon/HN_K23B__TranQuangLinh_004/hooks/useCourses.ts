import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Course } from "../types";

const STORAGE_KEY = "@courses_v2";

export const useCourses = () => {
  const updateCourseStatus = async (id: string, newStatus: "Đang hoạt động" | "Ngừng hoạt động") => {
    const updatedCourses = courses.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    setCourses(updatedCourses);
    await saveCoursesToStorage(updatedCourses);
  };
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const getCourses = useCallback(async () => {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      const coursesFromStorage =
        jsonValue != null ? JSON.parse(jsonValue) : [];
      setCourses(coursesFromStorage);
    } catch (e) {
      console.error("Lỗi khi tải khóa học:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const saveCoursesToStorage = async (coursesToSave: Course[]) => {
    try {
      const jsonValue = JSON.stringify(coursesToSave);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Lỗi khi lưu khóa học:", e);
    }
  };

  const addCourse = async (course: Omit<Course, "id">) => {
    // Kiểm tra tên khóa học không được trùng
    const isDuplicate = courses.some(c => c.name.trim().toLowerCase() === course.name.trim().toLowerCase());
    if (isDuplicate) {
      throw new Error("Tên khóa học đã tồn tại, vui lòng chọn tên khác.");
    }
    const newCourse: Course = { ...course, id: `course_${Date.now()}` };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    await saveCoursesToStorage(updatedCourses);
  };

  const updateCourse = async (updatedCourse: Course) => {
    const updatedCourses = courses.map((c) =>
      c.id === updatedCourse.id ? updatedCourse : c
    );
    setCourses(updatedCourses);
    await saveCoursesToStorage(updatedCourses);
  };

  const deleteCourse = async (id: string) => {
    const updatedCourses = courses.filter((c) => c.id !== id);
    setCourses(updatedCourses);
    await saveCoursesToStorage(updatedCourses);
  };

  const getCourseById = (id: string): Course | undefined => {
    return courses.find((c) => c.id === id);
  };

  return {
  courses,
  loading,
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  refreshCourses: getCourses,
  updateCourseStatus,
  };
};