import { UserPreview } from "@/entities/user";
import { DotsSixVertical, RemoveIcon } from "@/shared/ui/ui-icons";
import clsx from "clsx";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "../../model/use-board-store";
import { BoardCard, BoardCol } from "../../model/types";
import { useBoardSearch } from "../../model/board-search.store";

export function BoardCards({
  col,
  className,
}: {
  col: BoardCol;
  className?: string;
}) {
  return (
    <Droppable direction="vertical" droppableId={col.id} type="card">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={clsx(
            snapshot.isDraggingOver && "bg-blue-100/50",
            "p-1",
            className,
          )}
        >
          {col.items.map((item, index) => (
            <BoardCardComponent
              key={item.id}
              card={item}
              index={index}
              colId={col.id}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function BoardCardComponent({
  card,
  index,
  colId,
}: {
  card: BoardCard;
  index: number;
  colId: string;
}) {
  const { updateBoardCard, removeBoardCard } = useBoardStore();
  const { query } = useBoardSearch();

  if (card.title.toLowerCase().indexOf(query.toLowerCase()) === -1) {
    return null;
  }

  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <div ref={innerRef} {...draggableProps} className="py-1 relative">
          <div className="p-2 rounded shadow bg-white ">
            <div className="flex items-center gap-2 [&_.action]:hover:opacity-100">
              <div
                className="p-1 hover:bg-teal-100 rounded cursor-[grab] relative z-10"
                {...dragHandleProps}
              >
                <DotsSixVertical />
              </div>
              <button
                onClick={() => updateBoardCard(colId, card)}
                className="hover:underline p-1 text-lg grow text-start leading-tight"
              >
                {card.title}
              </button>
              <button
                className="text-rose-600 p-1 rounded-full hover:bg-rose-100 transition-all opacity-0 action"
                onClick={() => removeBoardCard(colId, card.id)}
              >
                <RemoveIcon className="w-4 h-4" />
              </button>
            </div>
            {card.assignee && (
              <UserPreview className="mt-3" size="sm" {...card.assignee} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
