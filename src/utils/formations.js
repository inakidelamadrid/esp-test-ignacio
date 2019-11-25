//@format
import compact from 'lodash/compact'
import reduce from 'lodash/reduce'

const fixSelection = (actualSelection, formationSize) => {
  if (actualSelection.length < formationSize) return actualSelection

  const head = actualSelection.slice(0, formationSize)
  const tail = compact(
    actualSelection.slice(formationSize, actualSelection.length)
  )

  if (tail.length > 0) {
    return head.map(selection => (selection ? selection : tail.shift()))
  }
  return head
}

const adaptTeamSelection = (teamSelection, formation) => {
  const [defenders, midfielders, forwards] = formation.split('-').map(Number)
  const formationSizes = { defenders, midfielders, forwards }

  const newTeamSelection = reduce(
    teamSelection,
    (acc, selection, key) => {
      const newSelection =
        key === 'keeper'
          ? selection
          : fixSelection(selection, formationSizes[key])
      return { ...acc, [key]: newSelection }
    },
    {}
  )
  return [teamSelection, newTeamSelection]
}

export { fixSelection, adaptTeamSelection }
