import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { ContainerCenter, Panel, Col } from "../components/Container"
import { FormGroup } from "../components/Form"
import Button from "../components/Button"

import { loginUser } from "../redux/modules/authentication"
import { push } from "react-router-redux"

import { Alerts } from "../components/Alert"

const mapStateToProps = state => ({
  authenticated: state.authentication.isAuthenticated,
  fetching: state.authentication.fetching,
})
const mapDispatchToProps = dispatch => ({
  loginUser: creds => dispatch(loginUser(creds)),
  goIndex: () => dispatch(push("/")),
})
class Login extends Component {
  state = {
    email: "",
    password: "",
  }
  handleEmail = e => {
    this.setState({
      email: e.target.value,
    })
  }
  handlePassword = e => {
    this.setState({
      password: e.target.value,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.loginUser({ ...this.state })
    this.setState({
      password: "",
    })
  }
  componentWillMount = () => {
    if (this.props.authenticated) {
      this.props.goIndex()
    }
  }
  render = () => {
    return (
      <ContainerCenter>
        <Alerts />
        <Panel>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col>Email</Col>
              <Col>
                <input
                  type="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.handleEmail}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col>Contraseña</Col>
              <Col>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.handlePassword}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={3} sm={9}>
                <Button type="submit" disabled={this.props.fetching}>
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </form>
        </Panel>
      </ContainerCenter>
    )
  }
}
Login.propTypes = {
  loginUser: PropTypes.func,
  authenticated: PropTypes.bool,
  goIndex: PropTypes.func,
  fetching: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
