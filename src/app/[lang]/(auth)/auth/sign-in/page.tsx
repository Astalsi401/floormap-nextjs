import { Button } from "@ui/button";
import { providerMap, signIn } from "@/libs/nextauth/auth";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;
  return (
    <div className="flex flex-col gap-4 w-full">
      {providerMap.map((provider) => (
        <form
          className="flex flex-col gap-2 max-w-80 w-full mx-auto"
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, { redirectTo: callbackUrl });
            } catch (error) {
              throw error;
            }
          }}
        >
          <Button
            type="submit"
            className="block w-full rounded-sm p-3 bg-foreground/30 text-foreground"
          >
            Login with {provider.name}
          </Button>
        </form>
      ))}
    </div>
  );
}
