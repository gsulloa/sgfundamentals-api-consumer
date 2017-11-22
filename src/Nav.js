import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route as RouteDom, Link, Switch, withRouter } from "react-router-dom"
import { Helmet } from "react-helmet"
import styled from "styled-components"
import { logoutUser } from "./redux/modules/authentication"
import routes from "./routes"
import Authorization from "./components/Authorization"

import Home from "./screens/Home"
import Login from "./screens/Login"
import Questions from "./screens/questions/Questions"
import Question from "./screens/questions/Question"
import { CreateQuestion, UpdateQuestion } from "./screens/questions/Forms"
import NotFound from "./screens/NotFound"

const siteTitle = title =>
  title ? `SGFundamentals | ${title}` : "SGFundamentals"

const App = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Nav = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  background-color: Black;
  color: White;
`

const NavSection = styled.div`
  display: flex;
  flex-flow: row;
`

const NavLeft = styled(NavSection)``

const NavRight = styled(NavSection)``

const NavHref = styled(Link)`
  padding: 0 12px;
  color: ${props => (props.className === "active" ? "#00bfff" : "white")};
  text-decoration: none;
  font-weight: lighter;
  cursor: pointer;
  :hover {
    color: #00bfff;
  }
`
const NavButton = styled.button`
  padding: 0 12px;
  color: ${props => (props.className === "active" ? "#00bfff" : "white")};
  text-decoration: none;
  font-weight: lighter;
  cursor: pointer;
  background: black;
  box-shadow: none;
  border: none;
  font-size: 17px;
  :hover {
    color: #00bfff;
  }
`

const NavLink = ({ to, label, exact, ignore = false }) =>
  <RouteDom path={to} exact={exact}>
    {({ match }) =>
      <NavHref to={to} className={!ignore && match ? "active" : ""}>
        {label}
      </NavHref>}
  </RouteDom>

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  ignore: PropTypes.bool,
}

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 50px 0 0;
  width: 100%;
`

const Route = props =>
  <Body>
    <Helmet>
      <title>
        {siteTitle(props.title)}
      </title>
    </Helmet>
    <RouteDom {...props} />
  </Body>

Route.propTypes = {
  title: PropTypes.string,
}

const FooterHref = styled.a`
  padding: 0 12px;
  color: ${props => (props.active ? "blueviolet" : "black")};
  text-decoration: none;
  font-weight: lighter;
  cursor: pointer;
  :hover {
    color: blueviolet;
  }
`

const FooterLink = ({ to, label }) =>
  <FooterHref href={to} target>
    {label}
  </FooterHref>

FooterLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
})

const UserScreen = Authorization(["user"])
class Navigator extends Component {
  static propTypes = {
    logout: PropTypes.func,
    isAuthenticated: PropTypes.bool,
  }
  logout = () => {
    this.props.logout()
  }
  render = () => {
    return (
      <App>
        <Nav>
          <NavLeft>
            <NavLink
              to={routes.homePath}
              label="SGFundamentals"
              exact
              ignore
            />
            <NavLink to={routes.questionsPath} label="Preguntas" />
          </NavLeft>
          <NavRight>
            {this.props.isAuthenticated
              ? <NavButton onClick={this.logout}>Logout</NavButton>
              : <NavLink to={routes.loginPath} label="Login" exact />}
          </NavRight>
        </Nav>
        <Switch>
          <Route exact path={routes.homePath} component={Home} />
          <Route exact path={routes.loginPath} component={Login} />
          <Route
            exact
            path={routes.questionsPath}
            component={UserScreen(Questions)}
          />
          <Route
            exact
            path={routes.questionsNewPath}
            component={UserScreen(CreateQuestion)}
          />
          <Route
            exact
            path={routes.questionsEditPath(":id")}
            component={UserScreen(UpdateQuestion)}
          />
          <Route
            exact
            path={routes.questionPath(":id")}
            component={Question}
          />
          <Route component={NotFound} title="Not found" />
        </Switch>
      </App>
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigator)
)
