import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import { Github } from "./providers/github";

const providers: Provider[] = [Github];

export const providerMap = providers
  .map((provider) => {
    const { id, name } = typeof provider === "function" ? provider() : provider;
    return { id, name };
  })
  .filter((provider) => provider.id !== "credentials");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
});
