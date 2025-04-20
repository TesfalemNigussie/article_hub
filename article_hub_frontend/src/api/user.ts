import { BASE_URL } from "@/config/constant";

export const login = async (request: { emailAddress: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    return await res.json();
}

export const register = async (request: { emailAddress: string; password: string, firstName: string, lastName: string }) => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    return await res.json();
}
