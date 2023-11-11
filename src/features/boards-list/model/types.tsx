export type BoardPartial = {
  id: string;
  title: string;
  editorsIds: string[];
  ownerId: string;
};

export type CreateBoardFormData = {
  title: string;
  editorsIds: string[];
};

export type UpdateBoardFormData = {
  title?: string;
  editorsIds?: string[];
  ownerId?: string;
};
