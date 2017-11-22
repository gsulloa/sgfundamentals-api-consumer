import React, { Component } from "react"
import { devlog } from "../../utils/log"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import routes from "../../routes"
import { ContainerCenter, Panel } from "../../components/Container"
import { Ul } from "../../components/List"
import { P } from "../../components/Text"

import { getQuestion } from "../../redux/modules/questions"

const mapStateToProps = (state, ownProps) => {
  const question = state.questions.data.find(
    e => e.id === Number(ownProps.match.params.id)
  )
  return {
    question: question.user
      ? question
      : { ...question, user: {}, comments: [] },
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  getQuestion: () => dispatch(getQuestion(ownProps.match.params.id)),
})

class Question extends Component {
  static propTypes = {
    getQuestion: PropTypes.func.isRequired,
    question: PropTypes.shape({
      user: PropTypes.object.isRequired,
      comments: PropTypes.array.isRequired,
    }).isRequired,
    fetching: PropTypes.bool,
  }
  static defaultProps = {
    question: {
      user: {},
      comments: [],
    },
  }
  componentWillMount = () => {
    this.props.getQuestion()
  }
  render = () => {
    devlog("QuestionProps", this.props)
    const { question } = this.props
    return (
      <ContainerCenter>
        <Panel>
          <h1>
            {question.title}
          </h1>
          <p>
            {question.content}
          </p>
          <div>
            <small>
              Autor: {question.user.username}
            </small>
          </div>
          <div>
            {question.comments.length
              ? <Ul>
                  {question.comments.map(comment => {
                    return (
                      <li key={comment.id}>
                        <strong>(user_id) {comment.userId}</strong>:&nbsp;{comment.content}
                      </li>
                    )
                  })}
                </Ul>
              : <P color="red">
                  Actualmente no hay comentarios, debes ingresar a la página
                  oficial para poder hacerlos!
                </P>}
          </div>
          <Link to={routes.questions_path}>Volver</Link>
        </Panel>
      </ContainerCenter>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Question)
)
