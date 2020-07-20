import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LESSONS_FEATURE_KEY,
  ChairsState,
  ChairsPartialState,
  chairAdapter
} from './chairs.reducer';

// Lookup the 'Chairs' feature state managed by NgRx
export const getChairsState = createFeatureSelector<
  ChairsPartialState,
  ChairsState
>(LESSONS_FEATURE_KEY);

const { selectAll, selectEntities } = chairAdapter.getSelectors();

export const getChairsLoaded = createSelector(
  getChairsState,
  (state: ChairsState) => state.loaded
);

export const getChairsError = createSelector(
  getChairsState,
  (state: ChairsState) => state.error
);

export const getAllChairs = createSelector(
  getChairsState,
  (state: ChairsState) => selectAll(state)
);

export const getChairsEntities = createSelector(
  getChairsState,
  (state: ChairsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getChairsState,
  (state: ChairsState) => state.selectedId
);

export const getSelectedChair = createSelector(
  getChairsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);