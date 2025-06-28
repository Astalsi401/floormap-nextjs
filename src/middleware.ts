export { auth as middleware } from "@/libs/nextauth/auth";
export const config = { matcher: ["/admin/:path*"] };
