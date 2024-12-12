import axios, { AxiosInstance, AxiosError } from "axios";
import store from "../app/store";
import {
  TeacherClassLogout,
  teacherLogout,
} from "../features/teacherSlice";
import { userClassLogout, userLogout } from "../features/studentSlice";
import { adminLogout } from "../features/adminSlice";

// Define role types for better type safety
type RoleType =
  | "teacher"
  | "student"
  | "admin"
  | "teacher-class"
  | "student-class";

// Custom hook for API calls
export const useApi = (): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3001", // Corrected URL
    withCredentials: true,
  });

  // Logout handler based on role
  const handleLogout = (role: RoleType): void => {
    switch (role) {
      case "teacher":
        store.dispatch(teacherLogout());
        break;
      case "student":
        store.dispatch(userLogout());
        break;
      case "admin":
        store.dispatch(adminLogout());
        break;
      case "teacher-class":
        store.dispatch(TeacherClassLogout());
        break;
      case "student-class":
        store.dispatch(userClassLogout());
        break;
      default:
        console.warn(`Unhandled role: ${role}`);
    }
  };

  // Handle unauthorized access
  const handleUnauthorized = (): void => {
    window.location.href = "/notAuthorized";
  };

  // Axios response interceptor for handling errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      console.error("API Error:", error);

      if (error.response) {
        const { data, status } = error.response;

        // Handle token-based logout
        if ((data as any)?.token === false) {
          handleLogout((data as any).role as RoleType);
        }

        if ((data as any)?.tokenClass === false) {
          handleLogout((data as any).role as RoleType);
        }

        // Handle unauthorized access
        if ((data as any)?.valid === false) {
          handleUnauthorized();
        }

        // Handle specific status codes
        switch (status) {
          case 403:
            console.warn("Forbidden access");
            break;
          case 404:
            console.warn("Resource not found");
            break;
          case 500:
            console.error("Server-side error occurred");
            break;
          default:
            console.warn(`Unknown error (${status})`);
        }
      } else {
        // Handle case where no response is received
        console.error("No server response received:", error.message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
