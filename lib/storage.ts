const ACCESS_TOKEN_KEY = "accessToken";

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}



export function getAccessToken() {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("accessToken");
}

export function removeAccessToken() {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}