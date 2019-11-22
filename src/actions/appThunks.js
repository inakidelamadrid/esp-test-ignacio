import request from 'superagent';

const API_ENDPOINT = 'http://localhost:4001';

const getURI = apiPath => {
  /* Although this is not a pure function, it helps by reducing the amount
   of changes needed if the host / api version changes */
  return `${API_ENDPOINT}/api/v1${apiPath}`
}

const appThunks = {
  loadFormations: () => (dispatch) => {
    request
      .get(getURI('/formations'))
      .then(function (res) {
        dispatch({
          type       : 'ADD_FORMATIONS',
          formations : res.body,
        });
      })
      .catch(function(err) {
        // err.message, err.response
      });
  },

  loadPlayers: () => (dispatch) => {
    request
      .get(getURI('/players'))
      .then(function (res) {
        dispatch({
          type    : 'ADD_PLAYERS',
          players : res.body,
        });
      })
      .catch(function(err) {
        // err.message, err.response
      });
  },
  /*
   * Although I don't use parentheses in arrow functions with one
   * parameter, I certainly add to the practices adopted in a team.
   * For now, it just helps me in focusing in solving the business problem
   * and type mechanically
   */
  loadTeamSelection: () => dispatch => {
    request
    .get(getURI('/team_selection'))
    .then( res => {
      dispatch({
        type: 'ADD_TEAM_SELECTION',
        team_selection: res.body
      })
    })
    .catch(err => {})
  }
};


export default appThunks;
