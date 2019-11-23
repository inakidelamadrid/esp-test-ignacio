import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {
  Card,
  Grid,
  Transition,
}                           from 'semantic-ui-react';
import _                    from 'lodash';

import RowButton            from './RowButton';
import RowPlayer            from './RowPlayer';
import Position             from '../../../globals/constants/Position';


class FormationRowPlayers extends Component {

  static propTypes = {
    maxPlayers : PropTypes.number,
    players: PropTypes.arrayOf(
      PropTypes.object
    ).isRequired,
    position   : PropTypes.oneOf(Position).isRequired,
  };

  static defaultProps = { maxPlayers: 1 };

  render() {
    const {
      maxPlayers,
      players,
      position,
    } = this.props;
    return (
      <Grid.Row>
        <Grid.Column>
          {!_.isEmpty(players) &&
            <Transition.Group
              animation='scale'
              as={Card.Group}
              className='centered'
              duration={200}
              itemsPerRow={5}
            >
              {_.times(maxPlayers, (i) =>
                _.get(players[i], 'id') ?
                  <RowPlayer
                    country={players[i].country}
                    firstName={players[i].first_name}
                    id={players[i].id}
                    key={i}
                    lastName={players[i].last_name}
                    position={position}
                  />
                  :
                  <RowButton
                    key={i}
                    position={position}
                    at={i}
                  />
              )}
            </Transition.Group>
          }

        </Grid.Column>
      </Grid.Row>
    );
  }

}

export default FormationRowPlayers;
