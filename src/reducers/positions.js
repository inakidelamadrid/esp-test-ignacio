const positions = (state = [], action) => {
  switch (action.type) {

    case 'LOAD_POSITIONS':
      return [...action.positions];
    default:
      return state;

  }
};

export default positions;
