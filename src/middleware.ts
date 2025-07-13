import { NextResponse } from "next/server";
import { auth } from "@/libs/nextauth/auth";
import { locales } from "@/dictionaries";
import { Routes } from "@/config/routes";
import type { NextRequest } from "next/server";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  const defaultLocale = "en"; // 預設語言
  if (!acceptLanguage) return defaultLocale;
  // 解析 Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.replace("q=", ""));
      return { code: code.trim(), quality };
    })
    .sort((a, b) => b.quality - a.quality); // 按優先級排序
  // 找到支援的語言
  for (const { code } of languages) {
    // 完全匹配
    if (locales.includes(code)) return code;
    // 部分匹配（例如 zh-TW 匹配 zh）
    const shortCode = code.split("-")[0];
    const match = locales.find((locale) => locale.startsWith(shortCode));
    if (match) return match;
  }
  return defaultLocale;
}

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }
  // 只對 admin 路徑檢查認證
  if (pathname.includes(Routes.private.admin)) {
    if (!req.auth) {
      const locale = getLocale(req);
      const loginUrl = new URL(`/${locale}${Routes.auth.signIn}`, req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  // 對所有路徑處理國際化
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
