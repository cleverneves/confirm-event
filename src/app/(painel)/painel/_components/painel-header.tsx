"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { logoutAction } from "../_actions/logout";
import { ProfileAvatar } from "./profile-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function PainelHeader({
  displayName,
  imageUrl,
}: {
  displayName: string;
  imageUrl: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isAccountSettings =
    pathname === "/painel/perfil" || pathname.startsWith("/painel/perfil/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleLogout() {
    const result = await logoutAction();
    if (result?.success === false) {
      toast.error(result.message);
    }
  }

  return (
    <header className="sticky top-0 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/painel" className="flex shrink-0 items-center gap-2">
          <span className="size-2 rounded-full bg-primary" />
          <span className="font-heading text-base font-semibold tracking-tight">
            Confirm Event
          </span>
        </Link>

        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                className="h-auto min-w-0 max-w-[min(12rem,40vw)] gap-2 px-2 py-1.5 sm:max-w-48"
                aria-label={`Conta: ${displayName}`}
              />
            }
          >
            <ProfileAvatar
              src={imageUrl}
              alt={displayName}
              className="size-9"
            />
            <span className="truncate text-sm text-muted-foreground">
              {displayName}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem
                aria-current={isAccountSettings ? "page" : undefined}
                className={cn(
                  isAccountSettings &&
                    "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                )}
                onClick={() => router.push("/painel/perfil")}
              >
                <SettingsIcon />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Sair
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
