import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import uuid from 'uuid/v4'

import './comment.css'
import Comment from './comment'
import CommentForm from './form'
import CommentsHeader from './comments-header'
import * as CommentValidator from './validator'
import * as CommentsAPI from '../../../api/comments'

class Comments extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      body: '',
      author: '',
      postId: '',
      successMessage: '',
      isLoading: false,
      isOpenForm: false,
      comments: [],
      errorMessages: []
    }
    this.openForm = this.openForm.bind(this)
    this.openEditForm = this.openEditForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const { post_id } = this.props.match.params
    this.setState({ isLoading: true })
    CommentsAPI
      .getAll(post_id)
      .then(comments => this.setState({ comments, postId: post_id, isLoading: false }))
  }

  handleInputChange (event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })

    const errorMessages = CommentValidator.validate(this.state)

    if (errorMessages.length) {
      this.setState({ errorMessages, isLoading: false })
      return
    } else {
      this.setState({ errorMessages })
    }

    const data = this.getData()

    if (this.state.id) {
      return this.updateComment(data)
    }

    this.createComment(data)
  }

  createComment (data) {
    CommentsAPI
      .store(data)
      .then(comment => {
        this.setState({
          body: '',
          author: '',
          successMessage: 'Comment saved.',
          isLoading: false,
          comments: [
            ...this.state.comments,
            comment
          ]
        })
      })
  }

  updateComment (data) {
    CommentsAPI
      .update(this.state.id, data)
      .then(comment => {
        this.setState({
          id: '',
          body: '',
          author: '',
          successMessage: 'Comment saved.',
          isLoading: false,
          comments: this.state.comments.map(item => {
            return item.id === comment.id ? comment : item
          })
        })
      })
  }

  getData () {
    const data = {
      id: uuid(),
      parentId: this.state.postId,
      author: this.state.author,
      body: this.state.body,
      timestamp: Date.now()
    }

    if (this.state.id) {
      delete data.id
      delete data.parentId
    }

    return data
  }

  openForm () {
    this.setState({ isOpenForm: true })
  }

  openEditForm (commentId) {
    const { id, body, author } = this.state.comments.find(item => item.id === commentId)
    this.setState({
      ...this.state,
      id,
      body,
      author,
      isOpenForm: true
    })
  }

  closeForm () {
    this.setState({
      isOpenForm: false,
      successMessage: '',
      errorMessages: []
    })
  }

  render () {
    const { comments, isOpenForm, errorMessages, successMessage,
      body, author, isLoading } = this.state
    return (
      <div>
        <CommentForm
          body={body}
          author={author}
          open={isOpenForm}
          isLoading={isLoading}
          close={this.closeForm}
          errorMessages={errorMessages}
          successMessage={successMessage}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />
        <CommentsHeader
          comments={comments}
          isLoading={isLoading}
          openForm={this.openForm}
        />
        <br />
        <Card.Group itemsPerRow={1}>
          {comments.map((item, index) => (
            <Comment key={index} comment={item} openEditForm={this.openEditForm} />
          ))}
        </Card.Group>
      </div>
    )
  }
}

export default withRouter(Comments)
