import { Chair } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedChair = createAction('[Chairs] Reset Selected Chair');
export const resetChairs = createAction('[Chairs] Reset Chairs');

// Select Chair
export const selectChair = createAction(
  '[Chairs] Select Chair',
  props<{ selectedId: string }>()
);

// Load Chairs
export const loadChairs = createAction('[Chairs] Load Chairs');

export const loadChairsSuccess = createAction(
  '[Chairs] Load Chairs Success',
  props<{ chairs: Chair[] }>()
);

export const loadChairsFailure = createAction(
  '[Chairs] Load Chairs Failure',
  props<{ error: any }>()
);

// Load Chair
export const loadChair = createAction(
  '[Chairs] Load Chair',
  props<{ chairId: string }>()
);

export const loadChairSuccess = createAction(
  '[Chairs] Load Chair Success',
  props<{ chair: Chair }>()
);

export const loadChairFailure = createAction(
  '[Chairs] Load Chair Failure',
  props<{ error: any }>()
);

// Create Chair
export const createChair = createAction(
  '[Chairs] Create Chair',
  props<{ chair: Chair }>()
);

export const createChairSuccess = createAction(
  '[Chairs] Create Chair Success',
  props<{ chair: Chair }>()
);

export const createChairFailure = createAction(
  '[Chairs] Create Chair Failure',
  props<{ error: any }>()
);

// Update Chair
export const updateChair = createAction(
  '[Chairs] Update Chair',
  props<{ chair: Chair }>()
);

export const updateChairSuccess = createAction(
  '[Chairs] Update Chair Success',
  props<{ chair: Chair }>()
);

export const updateChairFailure = createAction(
  '[Chairs] Update Chair Failure',
  props<{ error: any }>()
);

// Delete Chair
export const deleteChair = createAction(
  '[Chairs] Delete Chair',
  props<{ chair: Chair }>()
);

export const deleteChairCancelled = createAction(
  '[Chairs] Delete Chair Cancelled'
);

export const deleteChairSuccess = createAction(
  '[Chairs] Delete Chair Success',
  props<{ chair: Chair }>()
);

export const deleteChairFailure = createAction(
  '[Chairs] Delete Chair Failure',
  props<{ error: any }>()
);