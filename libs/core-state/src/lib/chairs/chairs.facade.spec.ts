import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ChairsEntity } from './chairs.models';
import { ChairsEffects } from './chairs.effects';
import { ChairsFacade } from './chairs.facade';

import * as ChairsSelectors from './chairs.selectors';
import * as ChairsActions from './chairs.actions';
import {
  CHAIRS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './chairs.reducer';

interface TestSchema {
  chairs: State;
}

describe('ChairsFacade', () => {
  let facade: ChairsFacade;
  let store: Store<TestSchema>;
  const createChairsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ChairsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CHAIRS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ChairsEffects]),
        ],
        providers: [ChairsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ChairsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allChairs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ChairsActions.loadChairs());

        list = await readFirst(facade.allChairs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadChairsSuccess` to manually update list
     */
    it('allChairs$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allChairs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ChairsActions.loadChairsSuccess({
            chairs: [createChairsEntity('AAA'), createChairsEntity('BBB')],
          })
        );

        list = await readFirst(facade.allChairs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
