import React,
{
  Component,
  Fragment,
}                  from 'react';
import PropTypes   from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Flag,
  Icon,
  List,
  Modal,
}                  from 'semantic-ui-react';

import appThunks   from '../../../actions/appThunks';
import ListLoading from '../ListLoading'

class PlayerSelectModal extends Component {

  static propTypes = {
    loadPlayers : PropTypes.func.isRequired,
    players     : PropTypes.array,
  };

  static defaultProps = { players: [] };

  state = { selectedPlayer: null};

  componentDidMount() {
    const {position} = this.props;
    this.props.loadPlayers({query: {position: position}});
  }

  handleSelect = (e,data) => {
    this.setState({ selectedPlayer: data.id });
  };

  insertPlayer = (position, at) => {
    const { selectedPlayer } = this.state;
    this.props.insertPlayer(selectedPlayer, position, at);
  }

  render() {
    const { selectedPlayer } = this.state;
    const { at, handleClose, players, position } = this.props;

    return (
      <Fragment>
        <Modal.Header content='Select A Player' />
        <Modal.Content
          scrolling
          style={{ padding: 0 }}
        >
          <List
            divided
            relaxed
            selection
          >
            {players ?
              players.map((player) => (
                <List.Item
                  active={selectedPlayer === player.id}
                  as='a'
                  content={player.position}
                  description={
                    <Fragment>
                      <Flag className={player.country} />
                      {selectedPlayer === player.id &&
                      <Icon
                        className='check'
                        color='green'
                        floated='right'
                        size='large'
                        style={{
                          position  : 'absolute',
                          right     : '1em',
                          top       : '50%',
                          transform : 'translateY(-50%)',
                        }}
                      />
                      }
                    </Fragment>
                  }
                  header={[player.first_name,player.last_name].join(' ')}
                  id={player.id}
                  image={{
                    avatar : true,
                    src    : player.img,
                  }}
                  key={player.id}
                  onClick={this.handleSelect}
                  style={{ position: 'relative' }}
                />
              ))
              : <ListLoading/>
            }
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content='Select'
            positive
            onClick={() => {
              this.insertPlayer(position, at);
              handleClose()
            }}
          />
          <Button
            content='Cancel'
            color='grey'
            onClick={() => {
              handleClose()
            }}
          />
        </Modal.Actions>
      </Fragment>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  insertPlayer: (id, position, at) => {
    dispatch(appThunks.insertPlayerInTeamSelection(id, position, at));
  },
  loadPlayers: (params) => {
    dispatch(appThunks.loadPlayers(params));
  },
});

const mapStateToProps = (state) => ({ 
  players: state.players,
  team_selection: state.team_selection
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelectModal);

