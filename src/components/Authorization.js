import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Authorization = (allowedRoles, text = true) => WrappedComponent => {
  class WithAuthorization extends Component {
    render = () => {
      const { role } = this.props.user || { role: "" }
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        if (text) {
          return <h1>Debes hacer login para continuar</h1>
        }
        return null
      }
    }
  }
  WithAuthorization.propTypes = {
    user: PropTypes.shape({
      userId: PropTypes.number,
      role: PropTypes.string,
    }),
  }
  const mapStateToProps = state => {
    return {
      user: state.authentication.data,
    }
  }
  return connect(mapStateToProps)(WithAuthorization)
}

export default Authorization
