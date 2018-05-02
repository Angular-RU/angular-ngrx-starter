import * as fromReducer from './search.reducer';
import { Search, SearchReset } from '@appStore/actions/search.actions';

describe('search reducer', () => {
  const init = { type: '@@init' } as any;
  let initialState: fromReducer.State;

  beforeEach(() => {
    initialState = {
      search: 'search'
    };
  });

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = fromReducer.reducer(initialState, init);

      expect(state).toEqual(initialState);
    });

    it('should update search', () => {
      const search = new Search('new search');
      const state = [init, search].reduce(fromReducer.reducer, initialState);

      expect(state).toMatchSnapshot();
    });

    it('should reset search', () => {
      const reset = new SearchReset();
      const state = [init, reset].reduce(fromReducer.reducer, initialState);

      expect(state).toMatchSnapshot();
    });
  });
});
