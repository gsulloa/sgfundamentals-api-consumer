import React, { Component } from "react"
import { connect } from "react-redux"

import { devlog } from "../utils/log"
import { ContainerCenter, Panel } from "../components/Container"

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

class Home extends Component {
  render() {
    devlog("Home", this.props)
    return (
      <ContainerCenter>
        <Panel>
          <h1>SGFundamentals</h1>
        </Panel>
      </ContainerCenter>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
