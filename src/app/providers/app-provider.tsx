import { queryClient } from "@/shared/api/query-client";
import { ComposeChildren } from "@/shared/lib/react";
import { Confirmations } from "@/widgets/confirmations";
import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider } from "./ability-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <AbilityProvider />
      <Confirmations />
      {children}
    </ComposeChildren>
  );
}
