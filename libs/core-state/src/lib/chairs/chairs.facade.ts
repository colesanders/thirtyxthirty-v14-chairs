import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Chair } from '@thirty/api-interfaces';

import * as ChairsActions from './chairs.actions';
import * as fromChairs from './chairs.reducer';
import * as ChairsSelectors from './chairs.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChairsFacade {
  loaded$ = this.store.pipe(select(ChairsSelectors.getChairsLoaded));
  allChairs$ = this.store.pipe(select(ChairsSelectors.getAllChairs));
  selectedChair$ = this.store.pipe(select(ChairsSelectors.getSelectedChair));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === ChairsActions.createChair({} as any).type ||
    action.type === ChairsActions.updateChair({} as any).type ||
    action.type === ChairsActions.deleteChair({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectChair(selectedId: string) {
    this.dispatch(ChairsActions.selectChair({ selectedId }));
  }

  resetSelectedChair(){
    this.dispatch(ChairsActions.resetSelectedChair());
  }

  loadChairs() {
    this.dispatch(ChairsActions.loadChairs());
  }

  loadChair(chairId: string) {
    this.dispatch(ChairsActions.loadChair({ chairId }));
  }

  createChair(chair: Chair) {
    this.dispatch(ChairsActions.createChair({ chair }));
  }

  updateChair(chair: Chair) {
    this.dispatch(ChairsActions.updateChair({ chair }));
  }

  deleteChair(chair: Chair) {
    this.dispatch(ChairsActions.deleteChair({ chair }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
