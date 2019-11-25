import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Flag, Icon, List, Modal } from 'semantic-ui-react'

import appThunks from '../../../actions/appThunks'
import ListLoading from '../ListLoading'
import compact from 'lodash/compact'
import reduce from 'lodash/reduce'

const teamSelectionFlatPlayerIds = teamSelection => {
  return reduce(
    teamSelection,
    (result, idsArray, key) => {
      return [...result, ...compact(idsArray)]
    },
    []
  )
}

class PlayerSelectModal extends Component {
  static propTypes = {
    loadPlayers: PropTypes.func.isRequired,
    players: PropTypes.array,
  }

  static defaultProps = { players: [] }

  state = { selectedPlayer: null }

  componentDidMount() {
    // first attempt was to limit the players list here. But that introduced a bug in the formation page: all other players not in the selected position were removed. Due to the size of the result, it's not that an issue to get all players from the API (for now)
    this.props.loadPlayers()
  }

  handleSelect = (e, data) => {
    this.setState({ selectedPlayer: data.id })
  }

  insertPlayer = (position, at) => {
    const { selectedPlayer } = this.state
    this.props.insertPlayer(selectedPlayer, position, at)
  }

  render() {
    const { selectedPlayer } = this.state
    const { at, handleClose, players, position } = this.props

    const playersInSelectionIds = teamSelectionFlatPlayerIds(
      this.props.teamSelection
    )

    const positionPlayers = players.filter(
      player =>
        player.position === position &&
        !playersInSelectionIds.includes(player.id)
    )

    return (
      <Fragment>
        <Modal.Header content="Select A Player" />
        <Modal.Content scrolling style={{ padding: 0 }}>
          <List divided relaxed selection>
            {positionPlayers ? (
              positionPlayers.map(player => (
                <List.Item
                  active={selectedPlayer === player.id}
                  as="a"
                  content={player.position}
                  description={
                    <Fragment>
                      <Flag className={player.country} />
                      {selectedPlayer === player.id && (
                        <Icon
                          className="check"
                          color="green"
                          floated="right"
                          size="large"
                          style={{
                            position: 'absolute',
                            right: '1em',
                            top: '50%',
                            transform: 'translateY(-50%)',
                          }}
                        />
                      )}
                    </Fragment>
                  }
                  header={[player.first_name, player.last_name].join(' ')}
                  id={player.id}
                  image={{
                    avatar: true,
                    src: player.img,
                  }}
                  key={player.id}
                  onClick={this.handleSelect}
                  style={{ position: 'relative' }}
                />
              ))
            ) : (
              <ListLoading />
            )}
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Select"
            positive
            onClick={() => {
              this.insertPlayer(position, at)
              handleClose()
            }}
          />
          <Button
            content="Cancel"
            color="grey"
            onClick={() => {
              handleClose()
            }}
          />
        </Modal.Actions>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  insertPlayer: (id, position, at) => {
    dispatch(appThunks.insertPlayerInTeamSelection(id, position, at))
  },
  loadPlayers: params => {
    dispatch(appThunks.loadPlayers(params))
  },
})

const mapStateToProps = state => ({
  players: state.players,
  teamSelection: state.teamSelection,
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelectModal)
