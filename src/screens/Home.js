import React, { Component } from "react"
import { connect } from "react-redux"

import { devlog } from "../utils/log"
import { ContainerCenter } from "../components/Container"

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Home extends Component {
  render() {
    devlog("Home", this.props)
    return (
      <ContainerCenter>
        <h1>IIC2113 - Web</h1>
        <h3>
          Api is at url {process.env.REACT_APP_API || "NO_ENV"}
        </h3>
      </ContainerCenter>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
