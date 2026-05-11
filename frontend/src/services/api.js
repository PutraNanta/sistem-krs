import axios from "axios";

class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.response?.data?.data?.message ||
      error?.message ||
      "Request failed";

    return Promise.reject(
      new ApiError(message, error?.response?.status || 500, error?.response?.data),
    );
  },
);

export const login = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

export const getProfile = async () => {
  const { data } = await apiClient.get("/auth/profile");
  return data;
};

export const getAvailableClasses = async () => {
  const { data } = await apiClient.get("/classes/available");
  return data;
};

export const createKrsDraft = async (academicYearId) => {
  const { data } = await apiClient.post("/krs", { academicYearId });
  return data;
};

export const getCurrentKrs = async () => {
  const { data } = await apiClient.get("/krs/current");
  return data;
};

export const addClassToKrs = async (krsId, classId) => {
  const { data } = await apiClient.post(`/krs/${krsId}/add-class`, { classId });
  return data;
};

export const removeClassFromKrs = async (krsDetailId) => {
  const { data } = await apiClient.delete(`/krs/${krsDetailId}/remove-class`);
  return data;
};

export const submitKrs = async (krsId) => {
  const { data } = await apiClient.post(`/krs/${krsId}/submit`);
  return data;
};

export const getKrsHistory = async () => {
  const { data } = await apiClient.get("/krs/history");
  return data;
};

export const getPendingKrs = async () => {
  const { data } = await apiClient.get("/krs/pending");
  return data;
};

export const approveKrs = async (krsId) => {
  const { data } = await apiClient.post(`/krs/${krsId}/approve`, {
    status: "approved",
  });
  return data;
};

export const rejectKrs = async (krsId, rejectionReason) => {
  const { data } = await apiClient.post(`/krs/${krsId}/reject`, {
    rejectionReason,
  });
  return data;
};

export const getCourses = async () => {
  const { data } = await apiClient.get("/courses");
  return data;
};

export default apiClient;
