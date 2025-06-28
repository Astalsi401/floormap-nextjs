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
  callbacks: {
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    authorized: async ({ auth }) => !!auth,
  },
});
