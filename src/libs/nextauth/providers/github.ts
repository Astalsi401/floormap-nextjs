import GithubProvider from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

export const Github: Provider = GithubProvider({
  id: "github",
  name: "Github",
  clientId: process.env.AUTH_GITHUB_ID,
  clientSecret: process.env.AUTH_GITHUB_SECRET,
});
