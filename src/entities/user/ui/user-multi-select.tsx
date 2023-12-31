import { UserPreview } from "@/entities/user";
import { UiMultipleSelect } from "@/shared/ui/ui-multiple-select";
import { useQuery } from "@tanstack/react-query";
import { usersListQuery } from "../queries";
import { UserDto } from "@/shared/api/modules/user";

export function UserMultiSelect({
  className,
  userIds,
  onChangeUserIds,
  label,
  error,
}: {
  error?: string;
  className?: string;
  userIds: string[];
  label?: string;
  onChangeUserIds: (ids: string[]) => void;
}) {
  const { data: users } = useQuery({
    ...usersListQuery(),
    initialData: [],
  });
  const selectedUsers = users.filter((u) => userIds.includes(u.id));
  const onChangeUsers = (users: UserDto[]) => {
    onChangeUserIds(users.map((u) => u.id));
  };

  return (
    <UiMultipleSelect
      error={error}
      className={className}
      label={label}
      options={users}
      value={selectedUsers}
      onChange={onChangeUsers}
      getLabel={(user) => user.name}
      renderPreview={(users) =>
        users?.map((user) => (
          <UserPreview
            key={user.id}
            className="shrink-0 px-1"
            size="sm"
            {...user}
          />
        ))
      }
      renderOption={(user) => <UserPreview size="sm" {...user} />}
    />
  );
}
