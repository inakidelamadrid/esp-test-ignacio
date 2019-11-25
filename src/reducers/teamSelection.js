import {adaptTeamSelection} from '../utils/formations'


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
    case 'ADD_REMOVE_PLAYER_IN_TEAM_SELECTION':
      return Object.assign({}, state, action.team_selection)
    case 'ADD_TEAM_SELECTION':
      const teamSelection = action.team_selection
      const [, newTeamSelection] = adaptTeamSelection(teamSelection, action.formation)
      return Object.assign({}, state, newTeamSelection)
    case 'CHANGE_TEAM_SELECTION':
      const [, currentState] = adaptTeamSelection(state, action.formation)
      return currentState
    default:
      return state
  }
}

export default players
