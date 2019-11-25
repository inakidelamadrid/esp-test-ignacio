import { adaptTeamSelection, fixSelection } from '../utils/formations'

test('it removes nulls if the selection is bigger than formation size', () => {
  expect(fixSelection([null, 18, null], 2)).toEqual([null, 18])
})

test('it fills up nulls from the left  if the selection is bigger than formation size and there are hidden players', () => {
  expect(fixSelection([null, 18, 12], 2)).toEqual([12, 18])
})

test('if filling nulls, it keeps the index of selections within threshold', () => {
  expect(fixSelection([18, null, 15, 14, null], 3)).toEqual([18, 14, 15])
  expect(fixSelection([18, null, null, 14, 13], 3)).toEqual([18, 14, 13])
})

test('it discards selections that dont fit in the new formation', () => {
  expect(fixSelection([18, 1, 15, 14, null], 3)).toEqual([18, 1, 15])
})

// TODO: Refactor this setup when we learn to build scenarios

test('Adapt Team Selection: it fixes the rows in the team selection based on a formation', () => {
  const [prevTeamSelection, newTeamSelection] = adaptTeamSelection({
    'keeper': [33],
    'defenders': [21, null, 32],
    'midfielders': [12, 11, null, null],
    'forwards': [null, 12, 11]
  }, '4-4-2')

  expect(prevTeamSelection).toEqual({
    'keeper': [33],
    'defenders': [21, null, 32],
    'midfielders': [12, 11, null, null],
    'forwards': [null, 12, 11]
  })

  expect(newTeamSelection).toEqual({
    'keeper': [33],
    'defenders': [21, null, 32],
    'midfielders': [12, 11, null, null],
    'forwards': [11, 12]
  })
})
