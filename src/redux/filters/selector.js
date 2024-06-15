import { createSelector } from '@reduxjs/toolkit';
import { selectCards } from '../cards/selectors';

// Селектор для отримання фільтра пріоритету
export const selectPriorityFilter = state => state.filters.priority;

// Мапа кольорів до значень пріоритетів
const priorityColorMap = {
  all: 'rgba(255, 255, 255, 0.3)',
  high: '#bedbb0',
  medium: '#e09cb5',
  low: '#8fa1d0',
};

// Селектор для фільтрації карток за кольором (пріоритетом)
export const selectFilteredCards = createSelector(
  [selectCards, selectPriorityFilter],
  (cards, priorityFilter) => {
    if (priorityFilter === 'all') {
      return cards;
    }

    const color = priorityColorMap[priorityFilter];

    return cards.filter(card => card.color === color);
  }
);
