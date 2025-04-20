export function saveUserToLocalStorage(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
}

export function removeUserFromLocalStorage() {
    localStorage.removeItem("user");
}

export function getUserFromLocalStorage(): any | null {
    const userData = localStorage.getItem("user");

    if (!userData) return null;

    try {
        return JSON.parse(userData);
    } catch (e) {
        return null;
    }
}