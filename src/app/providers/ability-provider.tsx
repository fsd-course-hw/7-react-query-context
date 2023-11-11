import { abilityContext, useAbilityFactory } from "@/features/auth";

export function AbilityProvider({ children }: { children?: React.ReactNode }) {
  const ability = useAbilityFactory();

  return (
    <abilityContext.Provider value={ability}>
      {children}
    </abilityContext.Provider>
  );
}
