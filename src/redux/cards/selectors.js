export const selectCards = state => {
  console.log('selectCards state', state);
  state.tasks.items;
};

export const selectCardsLoading = state => state.tasks.loading;

export const selectCardsError = state => state.tasks.error;
