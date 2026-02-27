const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginUser(email, password) {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login error:", errorText);
    throw new Error("Login failed");
  }

  return response.json();
}

export async function getWellnessEntries(token) {
  const response = await fetch(`${BASE_URL}/wellness`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Wellness fetch error:", errorText);
    throw new Error("Failed to fetch wellness data");
  }

  return response.json();
}


export async function createWellness(token, mood, sleepHours) {
  const response = await fetch(`${BASE_URL}/wellness`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mood: mood,
      sleep_hours: Number(sleepHours),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Create wellness error:", errorText);
    throw new Error("Failed to create entry");
  }

  return response.json();
}