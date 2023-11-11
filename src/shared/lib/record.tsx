export const listToRecord = <T extends { id: string }>(list: T[]) => {
  return list.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<string, T>,
  );
};
