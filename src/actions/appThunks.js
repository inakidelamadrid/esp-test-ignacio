import request from 'superagent'
import { positionMapping } from '../globals/constants/Position'
import { updateTeamSelection } from '../api'

const API_ENDPOINT = 'http://localhost:4001'

const fullURI = apiPath => {
  /* Although this is not a pure function, it helps by reducing the amount
   of changes needed if the host / api version changes */
  return `${API_ENDPOINT}/api/v1${apiPath}`
}

const appThunks = {
  loadFormations: () => dispatch => {
    request
      .get(fullURI('/formations'))
      .then(function(res) {
        dispatch({
          type: 'ADD_FORMATIONS',
          formations: res.body,
        })
      })
      .catch(function(err) {
        // err.message, err.response
      })
  },

  loadPlayers: () => dispatch => {
    request
      .get(fullURI('/players'))
      .then(function(res) {
        dispatch({
          type: 'ADD_PLAYERS',
          players: res.body,
        })
      })
      .catch(function(err) {
        // err.message, err.response
      })
  },
  /*
   * Although I don't use parentheses in arrow functions with one
   * parameter, I certainly add to the practices adopted in a team.
   * For now, it just helps me in focusing in solving the business problem
   * and type mechanically
   */
  loadTeamSelection: () => dispatch => {
    request
      .get(fullURI('/team_selection'))
      .then(res => {
        dispatch({
          type: 'ADD_TEAM_SELECTION',
          team_selection: res.body,
        })
      })
      .catch(err => {})
  },

  insertPlayerInTeamSelection: (id, position, at) => (dispatch, getState) => {
    const { teamSelection } = getState()
    const longPositionText = positionMapping(position)
    const positionPlayers = teamSelection[longPositionText]
    // just insert the id and remove any nulls
    positionPlayers.splice(at, 1, id)

    const newTeamSelection = {
      ...teamSelection,
      [longPositionText]: positionPlayers,
    }

    updateTeamSelection(newTeamSelection)
      .then(res => {
        dispatch({
          type: 'ADD_TEAM_SELECTION',
          team_selection: res.body,
        })
      })
      .catch(err => {})
  },

  removePlayerFromTeamSelection: (selectedId, position) => (
    dispatch,
    getState
  ) => {
    const { teamSelection } = getState()
    // position comes as short text (e.g MID) and the key in the object is
    // 'midfielders'
    const longPositionText = positionMapping(position)
    const positionPlayers = teamSelection[longPositionText]
    const newPlayers = positionPlayers.map(id =>
      id !== selectedId ? id : null
    )

    const newTeamSelection = {
      ...teamSelection,
      [longPositionText]: newPlayers,
    }

    updateTeamSelection(newTeamSelection)
      .then(res => {
        dispatch({
          type: 'ADD_TEAM_SELECTION',
          team_selection: res.body,
        })
      })
      .catch(err => {})
  },
}

export default appThunks
