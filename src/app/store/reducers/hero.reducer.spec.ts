import { Hero } from '@appModels/hero';
import {
  AddHero,
  AddHeroSuccess,
  DeleteHero,
  DeleteHeroSuccess,
  GetHeroById,
  GetHeroByIdSuccess,
  GetHeroes,
  GetHeroesSuccess,
  HeroError,
  SearchHeroes,
  SearchHeroesReset,
  SearchHeroesSuccess,
  UpdateHero,
  UpdateHeroSuccess
} from '@appStore/actions/hero.actions';
import * as fromReducer from './hero.reducer';

describe('hero reducer', () => {
  const init = { type: '@@init' } as any;
  let mockHero: Hero;
  let initialState: fromReducer.State;

  beforeEach(() => {
    mockHero = { id: 2, name: 'hero2' };

    initialState = fromReducer.initialState;
  });

  describe('State Changes', () => {
    it('should have an initial state', () => {
      const state = fromReducer.reducer(initialState, init);

      expect(state).toEqual(initialState);
    });

    it('should get heroes', () => {
      const getHeroes = new GetHeroes();
      const state = [init, getHeroes].reduce(fromReducer.reducer, initialState);

      expect(state).toMatchSnapshot();
    });

    it('should get heroes success', () => {
      const getHeroesSuccess = new GetHeroesSuccess([
        { id: 0, name: 'hero0' },
        { id: 1, name: 'hero1' }
      ]);
      const state = [init, getHeroesSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should add hero', () => {
      const addHero = new AddHero(mockHero);
      const state = [init, addHero].reduce(fromReducer.reducer, initialState);

      expect(state).toMatchSnapshot();
    });

    it('should add hero success', () => {
      const addHeroSuccess = new AddHeroSuccess(mockHero);
      const state = [init, addHeroSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should get hero by id', () => {
      const getHeroById = new GetHeroById(0);
      const state = [init, getHeroById].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should get hero by id success', () => {
      const getHeroByIdSuccess = new GetHeroByIdSuccess(mockHero);
      const state = [init, getHeroByIdSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should update hero', () => {
      const updateHero = new UpdateHero({ id: 0, name: 'new hero name' });
      const state = [init, updateHero].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should update hero success', () => {
      const updateHeroSuccess = new UpdateHeroSuccess({
        id: 0,
        name: 'new hero name'
      });
      const state = [init, updateHeroSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should delete hero', () => {
      const deleteHero = new DeleteHero({ id: 0 } as Hero);
      const state = [init, deleteHero].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should delete hero success', () => {
      const getHeroesSuccess = new GetHeroesSuccess([
        { id: 0, name: 'hero0' },
        { id: 1, name: 'hero1' }
      ]);
      const deleteHeroSuccess = new DeleteHeroSuccess({ id: 0 } as Hero);
      const state = [init, getHeroesSuccess, deleteHeroSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should search heroes', () => {
      const searchHeroes = new SearchHeroes('hero');
      const state = [init, searchHeroes].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should search heroes success', () => {
      const searchHeroesSuccess = new SearchHeroesSuccess([
        { id: 0, name: 'hero0' },
        { id: 1, name: 'hero1' }
      ]);
      const state = [init, searchHeroesSuccess].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should search heroes reset', () => {
      const searchHeroesReset = new SearchHeroesReset();
      const state = [init, searchHeroesReset].reduce(
        fromReducer.reducer,
        initialState
      );

      expect(state).toMatchSnapshot();
    });

    it('should hero error', () => {
      const heroError = new HeroError('error');
      const state = [init, heroError].reduce(fromReducer.reducer, initialState);

      expect(state).toMatchSnapshot();
    });
  });
});
