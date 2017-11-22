import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const ContainerRow = styled(Container)`
  flex-direction: row;
`

export const ContainerCenter = styled(Container)`
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const Panel = styled.div`
  padding: 50px;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 10px 10px 5px #888888;
`

export const Col = styled.div``

export default Container
