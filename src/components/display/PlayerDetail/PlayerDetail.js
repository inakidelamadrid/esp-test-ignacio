import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Flag,
  Form,
  Grid,
  Header,
  Image,
  Label,
  Segment,
  Transition,
} from 'semantic-ui-react'

import appThunks from '../../../actions/appThunks'

const PlayerDetail = ({
  match: {
    params: { playerID },
  },
}) => {
  // I was able to make this work only with hooks.
  const { playerDetail, positions } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appThunks.loadPositions())
  }, [dispatch])

  useEffect(() => {
    dispatch(appThunks.loadPlayerDetail(Number(playerID)))
  }, [dispatch, playerID])


  const [playerPosition, setPlayerPosition] = useState()
  useEffect(() => {
    // we need to catch the hook to set the initial value for the position correctly
    setPlayerPosition(playerDetail.position)
  }, [playerDetail])

  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = evt => {
    setIsEditing(isEditing => !isEditing)
  }

  const updatePosition = (evt, {value}) => setPlayerPosition(value)

  return (
    <Transition animation="fly up" duration={600} transitionOnMount>
      <Grid.Column width={11}>
        <Segment clearing color="teal" inverted>
          <Image
            floated="left"
            size="medium"
            src={playerDetail.img}
            style={{ marginBottom: 0 }}
            wrapped
          />

          <Header
            as="h2"
            content={[playerDetail.first_name, playerDetail.last_name].join(
              ' '
            )}
            style={{ marginTop: 0 }}
            subheader={
              <Label
                circular
                content={playerDetail.id}
                style={{
                  float: 'right',
                  marginTop: '.25em',
                }}
              />
            }
          />

          <Form inverted>
            <Form.Group widths="equal">
              <Form.Field inline>
                <label htmlFor="#">{'Country'}</label>
                <Flag
                  className={playerDetail.country}
                  style={{ margin: '1em 0' }}
                />
              </Form.Field>
              {isEditing ? (
                <Form.Select
                  compact
                  inline
                  label="Position"
                  options={positions}
                  value={playerPosition}
                  onChange={updatePosition}
                />
              ) : (
                <Form.Field inline>
                  <label htmlFor="#">{'Position'}</label>
                  <p style={{ margin: '1em 0' }}>{playerDetail.position}</p>
                </Form.Field>
              )}
            </Form.Group>
          </Form>
          <p>{playerDetail.bio}</p>

          {/*
            TODO: This button needs to toggle an edit state for the player. this
            will reveal a dropdown with available posiitons. This position can
            be changed in the dropdown and then the save button below can be
            used to save the changes.
          */}
          {isEditing ? (
            <Button content="SAVE" inverted positive />
          ) : (
            <Button
              content="Edit Player Position"
              inverted
              onClick={toggleEdit}
            />
          )}
        </Segment>
      </Grid.Column>
    </Transition>
  )
}

export default React.memo(PlayerDetail)
