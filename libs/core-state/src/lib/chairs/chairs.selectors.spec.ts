import { ChairsEntity } from './chairs.models';
import { State, chairsAdapter, initialState } from './chairs.reducer';
import * as ChairsSelectors from './chairs.selectors';

describe('Chairs Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getChairsId = (it) => it['id'];
  const createChairsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ChairsEntity);

  let state;

  beforeEach(() => {
    state = {
      chairs: chairsAdapter.addAll(
        [
          createChairsEntity('PRODUCT-AAA'),
          createChairsEntity('PRODUCT-BBB'),
          createChairsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Chairs Selectors', () => {
    it('getAllChairs() should return the list of Chairs', () => {
      const results = ChairsSelectors.getAllChairs(state);
      const selId = getChairsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ChairsSelectors.getSelected(state);
      const selId = getChairsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getChairsLoaded() should return the current 'loaded' status", () => {
      const result = ChairsSelectors.getChairsLoaded(state);

      expect(result).toBe(true);
    });

    it("getChairsError() should return the current 'error' state", () => {
      const result = ChairsSelectors.getChairsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
