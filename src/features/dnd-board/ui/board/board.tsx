import clsx from "clsx";
import { BoardColumn } from "./board-column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "../..";

export function Board({ className }: { className?: string }) {
  const { board, moveColumn, moveBoardCard } = useBoardStore();
  const columns = board.cols;

  return (
    <DragDropContext
      onDragEnd={(e) => {
        if (e.type === "column") {
          if (e.destination) {
            moveColumn(e.source.index, e.destination?.index ?? 0);
          }
        }
        if (e.type === "card") {
          if (e.destination) {
            moveBoardCard(
              {
                colId: e.source.droppableId,
                index: e.source.index,
              },
              {
                colId: e.destination.droppableId,
                index: e.destination.index,
              },
            );
          }
        }
      }}
    >
      <Droppable direction="horizontal" droppableId="board" type="column">
        {({ droppableProps, innerRef, placeholder }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className={clsx("flex  bg-gray-100 rounded-xl p-4 px-2", className)}
          >
            {columns.map((col, index) => (
              <BoardColumn key={col.id} col={col} index={index} />
            ))}
            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
