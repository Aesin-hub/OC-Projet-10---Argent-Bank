import api from "./apiClient";

// POST /user/login  -> { token }
export async function loginApi({ email, password }) {
  const { data } = await api.post("/user/login", { email, password });
  // data: { status, message, body: { token } }
  return data?.body?.token;
}

// POST /user/profile -> { id, email, firstName, lastName }
export async function getProfileApi() {
  const { data } = await api.post("/user/profile");
  return data?.body; // { id, email, firstName, lastName }
}

// PUT /user/profile -> met à jour { firstName, lastName }
export async function updateProfileApi({ firstName, lastName }) {
  const { data } = await api.put("/user/profile", { firstName, lastName });
  return data?.body; // profil mis à jour
}
