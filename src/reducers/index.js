import { combineReducers }  from 'redux';
import formations           from './formations';
import playerDetail         from './player';
import players              from './players';
import positions            from './positions';
import teamSelection        from './teamSelection';

const appReducer = combineReducers({
  formations,
  playerDetail,
  players,
  positions,
  teamSelection,
});

export default appReducer;
