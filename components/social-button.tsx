import Image from "next/image";
import SocialAuthButton from "./social-auth-button";
import { createClient } from "@/lib/supabase/client";

type provider = "github" | "google" | "facebook";

interface providerType {
  name: provider;
  label: string;
  icon: string;
  size: number;
}

const providers: providerType[] = [
  // {
  //     name: 'github',
  //     label: 'Sign in with GitHub',
  //     icon: 'github',
  //     size: '24px'
  // },
  {
    name: "google",
    label: "Sign in with Google",
    icon: "google.png",
    size: 24,
  },
  // {
  //     name: 'facebook',
  //     label: 'Sign in with Facebook',
  //     icon: 'facebook',
  //     size: '24px'
  // }
];

export default function SocialButton({ redirectTo }: { redirectTo: string }) {
  function handleSocialLogin(provider: provider) {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${redirectTo}`,
      },
    });
  }
  return (
    <div className="space-y-2">
      {providers.map((provider: providerType) => (
        <SocialAuthButton
          key={provider.name}
          action={() => handleSocialLogin(provider.name)}
        >
          <Image
            src={`/assets/${provider.icon}`}
            alt={`${provider.name} icon`}
            width={provider.size}
            height={provider.size}
          />
          {provider.label}
        </SocialAuthButton>
      ))}
    </div>
  );
}
