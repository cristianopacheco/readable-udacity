import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'

import {
  upVoteAPI,
  downVoteAPI
} from '../../redux-flow/reducers/posts/action-creators'

export const VoteButton = ({
  id,
  upVoteAPI,
  downVoteAPI,
  handleUpVote,
  handleDownVote,
  typeVote
}) => (
  <div>
    <Icon
      inverted
      circular
      color='blue'
      className='btn-pointer'
      name='thumbs outline up'
      onClick={() => {
        if (typeVote === 'post') {
          upVoteAPI(id)
        }
        handleUpVote(id)
      }}
      data-js='btn-upvote'
    />
    <Icon
      inverted
      circular
      color='red'
      className='btn-pointer'
      name='thumbs outline down'
      onClick={() => {
        if (typeVote === 'post') {
          downVoteAPI(id)
        }
        handleDownVote(id)
      }}
      data-js='btn-downvote'
    />
  </div>
)

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVoteAPI: PropTypes.func.isRequired,
  downVoteAPI: PropTypes.func.isRequired,
  handleUpVote: PropTypes.func,
  handleDownVote: PropTypes.func,
  typeVote: PropTypes.string
}

VoteButton.defaultProps = {
  handleUpVote: () => {},
  handleDownVote: () => {},
  typeVote: 'post'
}

const mapDispatchToProps = { upVoteAPI, downVoteAPI }

export default connect(null, mapDispatchToProps)(VoteButton)
