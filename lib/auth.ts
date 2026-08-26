export type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

const AUTH_COOKIE_NAME = "shop_auth";

export function getAuthCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookieString = document.cookie;
  if (!cookieString) {
    return null;
  }

  const cookie = cookieString
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=")[1] ?? "");
}

export function readAuthSession(): AuthSession | null {
  const cookieValue = getAuthCookie();
  if (!cookieValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookieValue) as Partial<AuthSession>;
    if (!parsed.token || !parsed.user) {
      return null;
    }

    return {
      token: parsed.token,
      user: parsed.user,
    };
  } catch {
    return null;
  }
}

export function writeAuthSession(session: AuthSession) {
  if (typeof document === "undefined") {
    return;
  }

  const value = encodeURIComponent(JSON.stringify(session));
  const secure = location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${AUTH_COOKIE_NAME}=${value}; path=/; max-age=604800; SameSite=Lax${secure}`;
}

export function clearAuthSession() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
