import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ChairsEffects } from './chairs.effects';
import * as ChairsActions from './chairs.actions';

describe('ChairsEffects', () => {
  let actions: Observable<any>;
  let effects: ChairsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ChairsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(ChairsEffects);
  });

  describe('loadChairs$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ChairsActions.loadChairs() });

      const expected = hot('-a-|', {
        a: ChairsActions.loadChairsSuccess({ chairs: [] }),
      });

      expect(effects.loadChairs$).toBeObservable(expected);
    });
  });
});
