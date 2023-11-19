import { BoardSearchStore } from "./use-board-search-store";
import {useRef, useState} from 'react';

export const useBoardSearchStoreFactory = (initialQuery = ''): BoardSearchStore => {
  const initialQueryRef = useRef(initialQuery);
  const [query, setQuery] = useState(initialQueryRef.current);
  const [submittedQuery, setSubmittedQuery] = useState(initialQueryRef.current);

  const submitQuery = () => {
    setSubmittedQuery(query);
  }
  const resetQuery = () => {
    setQuery(initialQueryRef.current);
    setSubmittedQuery(initialQueryRef.current);
  };

  return {
    query,
    submittedQuery,
    setQuery,
    submitQuery,
    resetQuery
  }
}