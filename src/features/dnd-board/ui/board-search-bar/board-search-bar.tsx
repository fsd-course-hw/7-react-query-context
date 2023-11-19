import clsx from 'clsx';
import { FormEventHandler } from 'react';
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { useBoardSearchStore } from '@/features/dnd-board';

export function BoardSearchBar({ className }: { className?: string }) {
  const { query, submittedQuery, setQuery, submitQuery, resetQuery } = useBoardSearchStore();
  const onSearch: FormEventHandler<HTMLFormElement> = (evt) => {
    evt?.preventDefault();
    submitQuery();
  };

  const onReset: FormEventHandler<HTMLFormElement> = (evt) => {
    evt?.preventDefault();
    resetQuery();
  };

  const isSearchDisabled = query === submittedQuery;

  return <form className={clsx(className, "flex justify-end gap-2")} onSubmit={onSearch} onReset={onReset}>
    <UiTextField inputProps={{
        placeholder: 'Искать задачу',
        value: query,
        onInput: (event) => setQuery(event.currentTarget.value)
      }} />
    <UiButton type="submit" variant="primary" disabled={isSearchDisabled}>Поиск</UiButton>
    <UiButton type="reset" variant="secondary">Сбросить</UiButton>
  </form>
}