import { useParams } from "react-router-dom";
import { ComposeChildren } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useSesssion } from "@/entities/session";
import { Board, BoardActions, useBoard, BoardUsers, BoardSearchBar } from "@/features/dnd-board";
import {
  BoardDepsProvider, BoardSearchStoreProvider,
  BoardStoreProvider,
  TaskEditorProvider,
} from "./providers";

export function BoardPage() {
  const params = useParams<"boardId">();
  const boardId = params.boardId;
  const session = useSesssion();

  const board = useBoard(boardId);

  if (!session) {
    return <div>Не авторизован</div>;
  }

  if (!board) {
    return <UiPageSpinner />;
  }

  return (
    <ComposeChildren>
      <TaskEditorProvider board={board} />
      <BoardDepsProvider />
      <BoardStoreProvider board={board} />
      <BoardSearchStoreProvider />
      <div className="flex flex-col py-3 px-4 grow">
        <h1 className="text-3xl mb-4 shrink-0 ">{board?.title}</h1>
        <BoardUsers className="mb-6" />
        <BoardActions className="shrink-0 mb-2" />
        <BoardSearchBar className="mb-2" />
        <Board className="basis-0 grow" />
      </div>
    </ComposeChildren>
  );
}
