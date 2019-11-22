import request from 'superagent'

const API_ENDPOINT = 'http://localhost:4001'

export const fullURI = apiPath => {
  /* Although this is not a pure function, it helps by reducing the amount
   of changes needed if the host / api version changes */
  return `${API_ENDPOINT}/api/v1${apiPath}`
}

export const loadFormations = () => request.get(fullURI('/formations'))

export const loadPlayer = id => request.get(fullURI(`/players/${id}`))

export const loadPlayers = (params = {}) => {
  // let's take advantage of Superagent's API
  // we could be super smart and do some meta programming to be able to chain
  // any method but let's do it only for query this time
  const base = request.get(fullURI('/players'))
  return params.query ? base.query(params.query) : base
}

export const loadTeamSelection = () => request.get(fullURI('/team_selection'))

export const updateTeamSelection = teamSelection =>
  request.post(fullURI('/team_selection')).send(teamSelection)
