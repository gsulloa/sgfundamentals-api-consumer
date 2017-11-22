import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { FormGroup } from "../../components/Form"
import Button from "../../components/Button"
import { ContainerCenter, Panel } from "../../components/Container"

import { newQuestion, editQuestion } from "../../redux/modules/questions"

class QuestionForm extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    submitForm: PropTypes.func.isRequired,
  }
  static defaultProps = {
    title: "",
    content: "",
  }
  state = {
    title: this.props.title,
    content: this.props.content,
  }
  handleWrite = (e, key) => {
    this.setState({
      [key]: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.submitForm(this.state)
  }
  render = () => {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <input
            type="text"
            value={this.state.title}
            onChange={e => this.handleWrite(e, "title")}
          />
        </FormGroup>
        <FormGroup>
          <textarea
            value={this.state.content}
            onChange={e => this.handleWrite(e, "content")}
          />
        </FormGroup>
        <Button>
          {this.props.buttonText}
        </Button>
      </form>
    )
  }
}

const CreateQuestionDisplay = ({ submitForm }) => {
  return (
    <ContainerCenter>
      <Panel>
        <h1>Nueva Pregunta</h1>
        <QuestionForm buttonText="Crear" submitForm={submitForm} />
      </Panel>
    </ContainerCenter>
  )
}
CreateQuestionDisplay.propTypes = {
  submitForm: PropTypes.func.isRequired,
}
const mapDispatchToCreateQuestionProps = dispatch => ({
  submitForm: data => dispatch(newQuestion(data)),
})
export const CreateQuestion = connect(null, mapDispatchToCreateQuestionProps)(
  CreateQuestionDisplay
)

class UpdateQuestionDisplay extends Component {
  render = () => {
    const { submitForm, question } = this.props
    return (
      <ContainerCenter>
        <Panel>
          <h1>Nueva Pregunta</h1>
          <QuestionForm
            buttonText="Actualizar"
            submitForm={submitForm}
            {...question}
          />
        </Panel>
      </ContainerCenter>
    )
  }
}
UpdateQuestionDisplay.propTypes = {
  submitForm: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
}
const mapStateToUpdateQuestionProps = (state, ownProps) => ({
  question: state.questions.data.find(
    e => e.id === Number(ownProps.match.params.id)
  ),
})
const mapDispatchToUpdateQuestionProps = (dispatch, ownProps) => ({
  submitForm: data =>
    dispatch(editQuestion(data, Number(ownProps.match.params.id))),
})
export const UpdateQuestion = withRouter(
  connect(mapStateToUpdateQuestionProps, mapDispatchToUpdateQuestionProps)(
    UpdateQuestionDisplay
  )
)
