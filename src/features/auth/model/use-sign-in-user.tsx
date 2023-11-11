import { useInvalidateSession } from "@/entities/session";
import { authApi } from "@/shared/api/modules/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInUser() {
  const invalidateSession = useInvalidateSession();
  const authUserMutation = useMutation({
    mutationFn: (userId: string) => {
      return authApi.signInAsUser(userId);
    },
    async onSuccess() {
      await invalidateSession();
    },
  });

  return (userId: string) => {
    return authUserMutation.mutate(userId);
  };
}
