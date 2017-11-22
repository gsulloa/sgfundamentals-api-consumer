import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { closeAlert } from "../redux/modules/alert"
import styled from "styled-components"

const Alert = styled.div``

const DivAlerts = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: row no-wrap;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "center"};
  align-items: ${props => (props.alignItems ? props.alignItems : "flex-start")};
  pointer-events: none;
  z-index: 50;
`

const CenterAlert = styled(Alert)`
  position: absolute;
  width: 60%;
  pointer-events: auto;
`

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeAlert: () => dispatch(closeAlert(ownProps.i)),
  }
}
class AlertDismissablePresentational extends Component {
  componentDidMount = () => {
    this.timeout = setTimeout(this.closeAlert, 10000)
  }
  closeAlert = () => {
    this.props.closeAlert()
    clearTimeout(this.timeout)
  }
  render = () => {
    const { body, title, ...props } = this.props
    return (
      <CenterAlert onDismiss={() => this.closeAlert()} {...props}>
        <h4>
          {title}
        </h4>
        {typeof body === "string"
          ? <p>
              {body}
            </p>
          : typeof body === "object"
            ? Object.keys(body).map((key, i) =>
                <p key={i}>
                  <strong>{key}</strong>: {body[key]}
                </p>
              )
            : undefined}
      </CenterAlert>
    )
  }
}
AlertDismissablePresentational.propTypes = {
  bsStyle: PropTypes.string,
  closeAlert: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.string,
}
const AlertDismissable = connect(null, mapDispatchToProps)(
  AlertDismissablePresentational
)

const SuccessAlertDismissable = ({ ...props }) => {
  return <AlertDismissable bsStyle="success" {...props} />
}
const DangerAlertDismissable = ({ ...props }) => {
  return <AlertDismissable bsStyle="danger" {...props} />
}

const mapStateAlertsToProps = state => {
  return {
    alerts: state.alert,
  }
}
let AlertsContainer = ({ alerts, justifyContent, alignItems, ...props }) => {
  return (
    <DivAlerts justifyContent={justifyContent} alignItems={alignItems}>
      {alerts.map((alert, i) => {
        switch (alert.type) {
          case "success":
            return (
              <SuccessAlertDismissable
                title={alert.title}
                body={alert.body}
                i={i}
                key={i}
                {...props}
              />
            )
          case "error":
            return (
              <DangerAlertDismissable
                title={alert.title}
                body={alert.body}
                i={i}
                key={i}
                {...props}
              />
            )
          default:
            return <DivAlerts />
        }
      })}
    </DivAlerts>
  )
}
AlertsContainer.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
    })
  ),
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
}
export const Alerts = connect(mapStateAlertsToProps, null)(AlertsContainer)

export default AlertDismissable
