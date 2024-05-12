import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const host = `http://${process.env.HOST}:8080`;

export async function signIn(formData: FormData) {
  "use server";
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let user;

  try {
    const response = await fetch(`${host}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const parsedResponse = await response.json();
    if (!response.ok) {
      return parsedResponse?.error;
    }
    user = parsedResponse.user;
    cookies().set("session", JSON.stringify({ user }));
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }

  redirect(`/dashboard/${user?.user_id}`);
}

export async function signOut() {
  cookies().set("session", "");
  redirect("/");
}

export async function register(formData: FormData) {
  "use server";
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  try {
    const response = await fetch(`${host}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse?.error;
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }

  redirect("/");
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return JSON.parse(session);
}

export async function getUser(user_id: string) {
  try {
    const response = await fetch(`${host}/users/${user_id}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return parsedResponse?.error;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }
}

export async function getRequests(user_id: string) {
  try {
    const response = await fetch(`${host}/requests/${user_id}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return parsedResponse?.error;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }
}

export async function createRequest(formData: FormData, user_id: string) {
  let amount = formData.get("amount") as string;
  let currency = formData.get("currency") as string;

  try {
    const response = await fetch(`${host}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, amount, currency }),
    });
    if (!response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse?.error;
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }

  redirect(`/dashboard/${user_id}`);
}

export async function getWages(user_id: string) {
  try {
    const response = await fetch(`${host}/wages/${user_id}`);
    const parsedResponse = await response.json();

    if (!response.ok) {
      return parsedResponse?.error;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }
}

export async function addWage(formData: FormData, user_id: string) {
  const amount = formData.get("balance") || 0;

  try {
    const response = await fetch(`${host}/wages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, amount, currency: "usd" }),
    });
    if (!response.ok) {
      const parsedResponse = await response.json();
      return parsedResponse?.error;
    }
  } catch (error) {
    console.error("Something went wrong: ", error);
    return error;
  }

  redirect(`/dashboard/${user_id}/wages`);
}
