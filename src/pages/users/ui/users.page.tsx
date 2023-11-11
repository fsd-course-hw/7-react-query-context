import { UiCetnerContentLayout } from "@/shared/ui/layouts/ui-center-content-layout";
import { CreateUserForm, UsersList } from "@/features/users-list";
import {
  SignInUserButton,
  SignOutButton,
  subject,
  useAbility,
} from "@/features/auth";

export function UsersPage() {
  const ability = useAbility();

  const renderUserAuthAction = (user: { id: string }) => {
    const canSignIn = ability.can(
      "sign-in-as",
      subject("User", { id: user.id }),
    );

    const canSignOut = ability.can(
      "sign-out",
      subject("User", { id: user.id }),
    );

    if (canSignIn) return <SignInUserButton userId={user.id} />;
    if (canSignOut) return <SignOutButton />;
  };

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Пользователи</h1>
      <h2 className="text-lg mb-2 font-semibold mt-10">
        Добавить пользователя
      </h2>
      <CreateUserForm />
      <h2 className="text-lg mb-2 font-semibold mt-10">Все пользователи</h2>
      <UsersList renderUserAuthAction={renderUserAuthAction} />
    </UiCetnerContentLayout>
  );
}
