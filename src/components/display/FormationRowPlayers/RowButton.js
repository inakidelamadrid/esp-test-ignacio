import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import {
  Button,
  Card,
  Dimmer,
  Modal,
}                           from 'semantic-ui-react';

import PlayerSelectModal    from '../PlayerSelectModal';


class RowButton extends Component {

  static propTypes = { 
    className : PropTypes.string,
  };

  static defaultProps = { className: null };

  state = { dimmerActive: false , modalOpen: false};

  handleMouseEnter = () => {
    this.setState({ dimmerActive: true });
  }

  handleMouseLeave = () => {
    this.setState({ dimmerActive: false });
  }

  openModal = () => {
    this.setState(state => ({...state, modalOpen: true}))
  }

  closeModal = () => {
    this.setState(state => ({...state, modalOpen: false}))
  }

  render() {
    // Note: unlike 'removing' we need an int to point at where within
    // the position we'll drop the player
    const { at, className, position } = this.props;

    const { dimmerActive } = this.state;

    return (
      <Dimmer.Dimmable
        as={Card}
        blurring
        className={className}
        dimmed={dimmerActive}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{
          backgroundColor : '#fdfdfd',
          borderColor     : '#ccc',
          borderStyle     : 'dashed',
          borderWidth     : '1px',
          boxShadow       : 'inset 0 .125em .25em #f0f0f0',
          minHeight       : '266px',
        }}
        tabIndex={0}
      >
        <Dimmer active={dimmerActive}>
          <Modal
            dimmer='blurring'
            size='mini'
            open={this.state.modalOpen}
            trigger={
              <Button
                content='Add'
                inverted
                size='small'
                onClick={this.openModal.bind(this)}
              />
            }
          >
            <PlayerSelectModal at={at} position={position} handleClose={this.closeModal.bind(this)} />
          </Modal>

        </Dimmer>
      </Dimmer.Dimmable>
    );
  }

}

export default RowButton;
