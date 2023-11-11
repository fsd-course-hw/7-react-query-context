export type Board = {
  id: string;
  title: string;
  cols: BoardCol[];
  ownerId: string;
  editorsIds: string[];
};

export type BoardCol = {
  id: string;
  title: string;
  items: BoardCard[];
};

export type BoardCard = {
  id: string;
  title: string;
  assignee?: {
    id: string;
    name: string;
    avatarId: string;
  };
};

export type CreateBoardData = {
  title: string;
  ownerId: string;
  editorsIds: string[];
};

export type UpdateBoardData = {
  title?: string;
  ownerId?: string;
  editorsIds?: string[];
};
