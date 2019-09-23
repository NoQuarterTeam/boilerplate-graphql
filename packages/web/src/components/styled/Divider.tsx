import { styled } from "@noquarter/ui"

const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.space.md} 0;
  padding: 0 ${p => p.theme.space.md};
  background-color: ${p => p.theme.colors.background};
`
export default Divider
