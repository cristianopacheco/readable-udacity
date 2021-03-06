import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon, Button, Label } from 'semantic-ui-react'

import VoteButtom from '../../post/vote-button'
import { timeStampToNow } from '../../../utils/helpers/date'
import { newLineToBr, captalize } from '../../../utils/helpers/string'

const Comment = ({
  comment,
  openEditForm,
  deleteComment,
  handleUpVote,
  handleDownVote
}) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {captalize(comment.author)}
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          {timeStampToNow(comment.timestamp)}
        </span>
      </Card.Meta>
      <Card.Description>
        {newLineToBr(comment.body)}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button as='div' labelPosition='right'>
        <Button data-js='btn-vote-score' color={comment.voteScore < 0 ? 'red' : 'blue'} size='mini'>
          <Icon name='heart' />
          Votes
        </Button>
        <Label as='a' basic color={comment.voteScore < 0 ? 'red' : 'blue'} pointing='left'>
          {comment.voteScore}
        </Label>
      </Button>
      <div style={{ float: 'right' }}>
        <VoteButtom
          id={comment.id}
          typeVote='comment'
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
      </div>
    </Card.Content>
    <Button.Group attached='bottom'>
      <Button data-js='btn-edit' onClick={() => openEditForm(comment.id)}>
        <Icon name='edit' />
        Edit
      </Button>
      <Button data-js='btn-delete' onClick={() => deleteComment(comment.id)}>
        <Icon name='trash' />
        Delete
      </Button>
    </Button.Group>
  </Card>
)

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  openEditForm: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  handleUpVote: PropTypes.func.isRequired,
  handleDownVote: PropTypes.func.isRequired
}

export default Comment
