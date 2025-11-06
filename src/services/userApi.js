import api from "./apiClient";

export async function loginApi({ email, password }) {
  const { data } = await api.post("/user/login", { email, password }, { headers: {Authorization: null} });
  return data?.body?.token;
}

export async function getProfileApi(token) {
  const { data } = await api.get("/user/profile", { 
    headers: { Authorization: `Bearer ${token}` } 
  });
  return data?.body;
}

export async function updateProfileApi({ userName }) {
  const { data } = await api.put("/user/profile", { userName });
  return data?.body;
}
