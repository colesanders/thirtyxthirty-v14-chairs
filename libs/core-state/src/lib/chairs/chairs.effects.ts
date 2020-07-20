import { Injectable } from '@angular/core';
import { ChairsService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as ChairsActions from './chairs.actions';
import { Chair } from '@thirty/api-interfaces';

@Injectable()
export class ChairsEffects {
  @Effect() loadChairs$ = this.actions$.pipe(
    ofType(ChairsActions.loadChairs),
    fetch({
      run: (action) => this.chairsService.all().pipe(
        map((chairs: Chair[]) => ChairsActions.loadChairsSuccess({ chairs }))
      ),
      onError: (action, error) => ChairsActions.loadChairsFailure({ error })
    })
  );

  @Effect() loadChair$ = this.actions$.pipe(
    ofType(ChairsActions.loadChair),
    fetch({
      run: (action) => this.chairsService.byId(action.chairId).pipe(
        map((chair: Chair) => ChairsActions.loadChairSuccess({ chair }))
      ),
      onError: (action, error) => ChairsActions.loadChairFailure({ error })
    })
  );

  @Effect() createChair$ = this.actions$.pipe(
    ofType(ChairsActions.createChair),
    pessimisticUpdate({
      run: (action) => this.chairsService.create(action.chair).pipe(
        map((chair: Chair) => ChairsActions.createChairSuccess({ chair }))
      ),
      onError: (action, error) => ChairsActions.createChairFailure({ error })
    })
  );

  @Effect() updateChair$ = this.actions$.pipe(
    ofType(ChairsActions.updateChair),
    pessimisticUpdate({
      run: (action) => this.chairsService.update(action.chair).pipe(
        map((chair: Chair) => 
          ChairsActions.updateChairSuccess({ chair }))
      ),
      onError: (action, error) => ChairsActions.updateChairFailure({ error })
    })
  );

  @Effect() deleteChair$ = this.actions$.pipe(
    ofType(ChairsActions.deleteChair),
    pessimisticUpdate({
      run: (action) => this.chairsService.delete(action.chair.id).pipe(
        map((chair: Chair) => ChairsActions.deleteChairSuccess({ chair })),
      ),
      onError: (action, error) => ChairsActions.deleteChairFailure({ error })
    })
  );

  // Effect to refresh the chair after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(ChairsActions.deleteChairSuccess, ChairsActions.updateChairSuccess),
  //   tap(action => {
  //     ChairsActions.loadChairs();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private chairsService: ChairsService
  ) {}
}