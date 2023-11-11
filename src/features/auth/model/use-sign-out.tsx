import { useInvalidateSession } from "@/entities/session";
import { authApi } from "@/shared/api/modules/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignOut() {
  const invalidateSession = useInvalidateSession();
  const signOutMutation = useMutation({
    mutationFn: () => {
      return authApi.signOut();
    },
    async onSuccess() {
      await invalidateSession();
    },
  });

  return () => {
    return signOutMutation.mutate();
  };
}
