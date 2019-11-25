const Position = ['FWD', 'MID', 'DEF', 'GOL']

export const positionMapping = shortPosText => {
  return {
    DEF: 'defenders',
    FWD: 'forwards',
    GOL: 'keeper',
    MID: 'midfielders',
  }[shortPosText]
}

export default Position
