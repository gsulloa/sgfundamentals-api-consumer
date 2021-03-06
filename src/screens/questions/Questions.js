import React, { Component } from "react"
import { devlog } from "../../utils/log"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import routes from "../../routes"
import { ContainerCenter, Panel } from "../../components/Container"

import { getQuestions } from "../../redux/modules/questions"

const mapStateToProps = state => ({
  questions: state.questions.data,
  fetching: state.questions.fetching,
})
const mapDispatchToProps = dispatch => ({
  getQuestions: () => dispatch(getQuestions()),
})

class Questions extends Component {
  static propTypes = {
    getQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    fetching: PropTypes.bool,
  }
  static defaultProps = {
    questions: [],
  }
  componentWillMount = () => {
    this.props.getQuestions()
  }
  render = () => {
    devlog("QuestionProps", this.props)
    return (
      <ContainerCenter>
        <Panel>
          {this.props.fetching
            ? <h1>Loading</h1>
            : <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Titulo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.questions.map((question, i) => {
                    return (
                      <tr key={question.id}>
                        <td>
                          {i + 1}
                        </td>
                        <td>
                          {question.title}
                        </td>
                        <td>
                          {question["created-at"]}
                        </td>
                        <td>
                          <Link to={routes.questionPath(question.id)}>Ver</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>}
          <Link to={routes.questionsNewPath}>Nueva Pregunta</Link>
        </Panel>
      </ContainerCenter>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions)
