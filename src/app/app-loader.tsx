import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { boardsListQuery } from "@/entities/board";
import { sessionQuery } from "@/entities/session";
import { usersListQuery } from "@/entities/user";
import { tasksListQuery } from "@/entities/task";

export function AppLoader({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      queryClient.prefetchQuery({
        ...boardsListQuery(),
      }),
      queryClient.prefetchQuery({
        ...sessionQuery(),
      }),
      queryClient.prefetchQuery({
        ...usersListQuery(),
      }),
      queryClient.prefetchQuery({
        ...tasksListQuery(),
      }),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, [queryClient]);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  return <>{children}</>;
}
