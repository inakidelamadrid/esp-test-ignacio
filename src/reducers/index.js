import { combineReducers }  from 'redux';
import formations           from './formations';
import playerDetail         from './player';
import players              from './players';
import teamSelection        from './teamSelection';

const appReducer = combineReducers({
  formations,
  playerDetail,
  players,
  teamSelection,
});

export default appReducer;
