const player = (state = {}, action) => {
  switch (action.type) {

    case 'ADD_PLAYER_DETAIL':
      return [...action.player];
    default:
      return state;
  }
};

export default player;
