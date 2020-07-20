import { Chair } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ChairsActions from './chairs.actions';

export const LESSONS_FEATURE_KEY = 'chair';

export interface ChairsState extends EntityState<Chair> {
  selectedId?: string | number; // which Chairs record has been selected
  loaded: boolean; // has the Chairs list been loaded
  error?: string | null; // last known error (if any)
}

export interface ChairsPartialState {
  readonly [LESSONS_FEATURE_KEY]: ChairsState;
}

export const chairAdapter: EntityAdapter<Chair> = createEntityAdapter();

export const initialChairsState: ChairsState = chairAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _chairsReducer = createReducer(
  initialChairsState,
  on(ChairsActions.resetChairs, state => chairAdapter.removeAll(state)),
  on(ChairsActions.resetSelectedChair, state => Object.assign({}, state, { selectedId: null })),
  on(ChairsActions.selectChair, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load chairs
  on(
    ChairsActions.loadChairsSuccess,
    (state, { chairs }) =>
    chairAdapter.setAll(chairs, { ...state, loaded: true })
  ),
  // Load chair
  on(
    ChairsActions.loadChairSuccess,
    (state, { chair }) =>
    chairAdapter.upsertOne(chair, { ...state, loaded: true })
  ),
  // Add chair
  on(ChairsActions.createChairSuccess,
    (state, { chair }) =>
    chairAdapter.addOne(chair, state)
  ),
  // Update chair
  on(ChairsActions.updateChairSuccess,
    (state, { chair }) =>
    chairAdapter.updateOne({ id: chair.id, changes: chair }, state)
  ),
  // Delete chair
  on(ChairsActions.deleteChairSuccess,
    (state, { chair }) =>
    chairAdapter.removeOne(chair.id, state)
  ),

  // failure actions
  on(
    ChairsActions.deleteChairFailure,
    ChairsActions.updateChairFailure,
    ChairsActions.createChairFailure,
    ChairsActions.loadChairFailure,
    ChairsActions.loadChairsFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    ChairsActions.loadChair,
    ChairsActions.loadChairs,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function chairsReducer(state: ChairsState | undefined, action: Action) {
  return _chairsReducer(state, action);
}