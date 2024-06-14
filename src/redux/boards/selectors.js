export const selectBoards = state => state.boards.boards.items;

export const selectIsLoading = state => state.boards.boards.isLoading;

export const selectError = state => state.boards.boards.error;

export const selectOneBoard = state => state.boards.boards.current;

export const selectColumnsByBoardId = state =>
  state.boards.boards.current.columns;

export const selectBackgrounds = state => state.boards.boards.backgrounds;

export const selectCurrentBoard = state => state.boards.boards.current;

