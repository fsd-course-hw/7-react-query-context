import { UiButton } from "@/shared/ui/ui-button";
import { useSignInUser } from "../model/use-sign-in-user";

export function SignInUserButton({
  className,
  userId,
}: {
  className?: string;
  userId: string;
}) {
  const singInUser = useSignInUser();
  return (
    <UiButton
      className={className}
      variant="primary"
      onClick={() => singInUser(userId)}
    >
      Войти как
    </UiButton>
  );
}
