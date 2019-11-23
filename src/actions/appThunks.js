import { positionMapping } from '../globals/constants/Position'
import {
  loadFormations,
  loadPlayer,
  loadPlayers,
  loadPositions as loadPositionsEndpoint,
  loadTeamSelection,
  updatePlayer as updatePlayerEndpoint,
  updateTeamSelection,
} from '../api'

const pickPositionPlayers = (teamSelection, position) => {
  // position comes as short text (e.g MID) and the key in the object is
  // 'midfielders'
  const positionKey = positionMapping(position)
  const positionPlayers = teamSelection[positionKey]
  return [positionKey, positionPlayers]
}

const appThunks = {
  loadFormations: () => dispatch => {
    loadFormations()
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

  loadPlayerDetail: id => dispatch => {
    loadPlayer(id)
      .then(function(res) {
        dispatch({
          type: 'ADD_PLAYER_DETAIL',
          player: res.body,
        })
      })
      .catch(function(err) {
        // err.message, err.response
      })
  },

  loadPlayers: params => dispatch => {
    loadPlayers(params)
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

  loadPositions: () => dispatch => {
    loadPositionsEndpoint()
      .then(res => {
        dispatch({
          type: 'LOAD_POSITIONS',
          positions: res.body,
        })
      })
      .catch(err => {})
  },
  /*
   * Although I don't use parentheses in arrow functions with one
   * parameter, I certainly add to the practices adopted in a team.
   * For now, it just helps me in focusing in solving the business problem
   * and type mechanically
   */
  loadTeamSelection: () => dispatch => {
    loadTeamSelection()
      .then(res => {
        dispatch({
          type: 'ADD_TEAM_SELECTION',
          team_selection: res.body,
        })
      })
      .catch(err => {})
  },

  modifyPlayer: modifiedPlayer => (dispatch, getState) => {
    const { players } = getState()

    const newPlayers = players.filter(player =>
      player.id === modifiedPlayer.id ? modifiedPlayer : player
    )

    updatePlayerEndpoint(modifiedPlayer)
      .then(res => {
        dispatch({
          type: 'ADD_PLAYERS',
          players: newPlayers,
        })
      })
      .catch(err => {})
  },

  insertPlayerInTeamSelection: (id, position, at) => (dispatch, getState) => {
    const { teamSelection } = getState()
    const [positionKey, players] = pickPositionPlayers(teamSelection, position)
    players.splice(at, 1, id)

    const newTeamSelection = {
      ...teamSelection,
      [positionKey]: players,
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
    const [positionKey, players] = pickPositionPlayers(teamSelection, position)
    const newPlayers = players.map(id => (id !== selectedId ? id : null))

    const newTeamSelection = {
      ...teamSelection,
      [positionKey]: newPlayers,
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
