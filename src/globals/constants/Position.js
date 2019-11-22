const Position = ['FWD', 'MID', 'DEF', 'GOL']

export const positionMapping = shortPosText => {
  return {
    DEF: 'defenders',
    FWD: 'forwards',
    GOAL: 'keeper',
    MID: 'midfielders',
  }[shortPosText]
}

export default Position
