import {
  Board,
  BoardActions,
  BoardSearch,
  BoardSearchProvider,
  useBoard,
} from "@/features/dnd-board";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useParams } from "react-router-dom";
import {
  BoardDepsProvider,
  BoardStoreProvider,
  TaskEditorProvider,
} from "./providers";
import { useSesssion } from "@/entities/session";
import {
  BoardEditors,
  UpdateBoardAccessButton,
} from "@/features/manage-board-access";
import { subject, useAbility } from "@/features/auth";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const sesson = useSesssion();
  const ability = useAbility();

  const board = useBoard(boardId);

  if (!board) {
    return <UiPageSpinner />;
  }

  const canReadBoard = ability.can("read", subject("Board", board));
  const canUpdateAccess = ability.can("update-access", subject("Board", board));

  if (!sesson || !canReadBoard) {
    return <div>Не авторизован</div>;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider />
      <BoardSearchProvider />
      <BoardStoreProvider board={board} />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <div className="shrink-0 mb-2 flex gap-5">
          <BoardActions />
          <BoardSearch className="w-[250x]" />
          <div className="flex gap-2 items-center">
            <div>Редакторы: </div>
            <BoardEditors board={board} />

            {canUpdateAccess && <UpdateBoardAccessButton board={board} />}
          </div>
        </div>
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
