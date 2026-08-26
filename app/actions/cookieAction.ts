export function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const rawCookie = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (!rawCookie) {
    return null;
  }

  const equalsIndex = rawCookie.indexOf("=");
  const cookieValue = rawCookie.slice(equalsIndex + 1);

  return decodeURIComponent(cookieValue || "");
}

export function writeCookie(name: string, value: string) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const cookieValue = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=604800; SameSite=Lax${secure}`;

  document.cookie = cookieValue;

  console.debug("cookie written:", document.cookie);
}
