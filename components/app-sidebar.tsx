"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { SideNavSeller } from "@/components/sidenav-seller";
import { SideNavUser } from "@/components/sidenav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Home",
      url: "/seller/dashboard/home",
      icon: Frame,
    },
    {
      name: "Produk",
      url: "/seller/dashboard/produk",
      icon: PieChart,
    },
    {
      name: "Order",
      url: "/seller/dashboard/order",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="!bg-black text-white pt-8 px-4">
      <SidebarHeader className="bg-black">
        <Link href="/">
          <p className="font-display text-4xl md:ml-2 tracking-[-0.08em]">
            Laksa
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SideNavSeller projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-black">
        <SideNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
