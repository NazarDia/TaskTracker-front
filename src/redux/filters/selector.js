import { createSelector } from '@reduxjs/toolkit';
import { selectCards } from '../cards/selectors';

// Селектор для отримання фільтра пріоритету
export const selectPriorityFilter = state => state.filters.priority;

// Мапа кольорів до значень пріоритетів
const priorityColorMap = {
  none: 'rgba(255, 255, 255, 0.3)',
  low: '#8fa1d0',
  medium: 'medium',
  high: 'high',
};

// Селектор для фільтрації карток за кольором (пріоритетом)
export const selectFilteredCards = createSelector(
  [selectCards, selectPriorityFilter],
  (cards, priorityFilter) => {
    if (priorityFilter === 'all') {
      return cards;
    }

    const label = priorityColorMap[priorityFilter];

    return cards.filter(card => card.label === label);
  }
);
