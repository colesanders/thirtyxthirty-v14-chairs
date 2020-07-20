import { ChairsEntity } from './chairs.models';
import * as ChairsActions from './chairs.actions';
import { State, initialState, reducer } from './chairs.reducer';

describe('Chairs Reducer', () => {
  const createChairsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ChairsEntity);

  beforeEach(() => {});

  describe('valid Chairs actions', () => {
    it('loadChairsSuccess should return set the list of known Chairs', () => {
      const chairs = [
        createChairsEntity('PRODUCT-AAA'),
        createChairsEntity('PRODUCT-zzz'),
      ];
      const action = ChairsActions.loadChairsSuccess({ chairs });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
