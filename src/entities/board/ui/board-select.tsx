import { UiSelect } from "@/shared/ui/ui-select-field";
import { useQuery } from "@tanstack/react-query";
import { boardsListQuery } from "../queries";
import { BoardPartialDto } from "@/shared/api/modules/board";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,
  filterOptions = () => true,
}: {
  error?: string;

  className?: string;
  boardId?: string;
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
  filterOptions?: (board: BoardPartialDto) => boolean;
}) {
  const { data: boards } = useQuery({
    ...boardsListQuery(),
    select: (data) => data.filter(filterOptions),
    initialData: [],
  });

  const board = boards.find((board) => board.id === boardId);

  const options = required ? boards : [undefined, ...boards];

  const onChangeBoard = (board?: BoardPartialDto) => {
    onChangeBoardId(board?.id);
  };

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={board}
      onChange={onChangeBoard}
      getLabel={(board) => board?.title ?? ""}
    />
  );
}
