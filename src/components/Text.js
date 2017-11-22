import styled from "styled-components"

export const P = styled.p`
  color: ${props => (props.color ? props.color : "black")};
`
