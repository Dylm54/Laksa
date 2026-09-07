import { AuthButton } from "@/components/auth-button";
import Navbar from "@/components/ui/navbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={null}>
        <Navbar>
          <Suspense fallback={null}>
            <AuthButton />
          </Suspense>
        </Navbar>
      </Suspense>
      {/* <nav className="fixed top-0 left-1/2 z-50 -translate-x-1/2">
        <LiquidGlassTabBar fixed={false} activeColor="#B23386"/>
      </nav> */}
      {children}
    </div>
  );
}
