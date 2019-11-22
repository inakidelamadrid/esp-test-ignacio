import request from 'superagent'

const API_ENDPOINT = 'http://localhost:4001'

export const fullURI = apiPath => {
  /* Although this is not a pure function, it helps by reducing the amount
   of changes needed if the host / api version changes */
  return `${API_ENDPOINT}/api/v1${apiPath}`
}

export const updateTeamSelection = teamSelection =>
  request.post(fullURI('/team_selection')).send(teamSelection)
