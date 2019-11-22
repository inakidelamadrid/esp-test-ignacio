/*
  the initial state needs to initialize each of the keys in the contract
  so that the rendering doesn't blow when waiting for state to load
*/
const initialState = {
  defenders: [],
  forwards: [],
  keeper: [],
  midfielders: [],
}
const players = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TEAM_SELECTION':
      return Object.assign({}, state, action.team_selection)
    case 'REMOVE_PLAYER_FROM_TEAM_SELECTION':
      return state
    default:
      return state
  }
}

export default players
