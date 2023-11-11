import { UserPreview, usersListQuery } from "@/entities/user";
import { UserDto } from "@/shared/api/modules/user";
import { UiSelect } from "@/shared/ui/ui-select-field";
import { useQuery } from "@tanstack/react-query";

export function UserSelect({
  className,
  label,
  onChangeUserId,
  userId,
  required,
  error,
  filterOptions = () => true,
}: {
  error?: string;

  className?: string;
  userId?: string;
  label?: string;
  onChangeUserId: (id?: string) => void;
  required?: boolean;
  filterOptions?: (option: UserDto) => boolean;
}) {
  const { data: users } = useQuery({
    ...usersListQuery(),
    select: (data) => data.filter(filterOptions),
    initialData: [],
  });

  const user = users.find((user) => user.id === userId);

  const options = required ? users : [undefined, ...users];

  const onChangeUser = (user?: UserDto) => {
    onChangeUserId(user?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={user}
      onChange={onChangeUser}
      getLabel={(user) => user?.name ?? ""}
      renderPreview={(user) =>
        user ? (
          <UserPreview size="sm" className="shrink-0 px-1" {...user} />
        ) : (
          <div>Не выбрано</div>
        )
      }
      renderOption={(user) =>
        user ? <UserPreview size="sm" {...user} /> : <div>Не выбрано</div>
      }
    />
  );
}
