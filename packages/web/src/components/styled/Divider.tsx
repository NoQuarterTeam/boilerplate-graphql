import { styled } from "@noquarter/ui"

const Divider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.paddingM} 0;
  padding: 0 ${p => p.theme.paddingM};
  background-color: ${p => p.theme.colorBackground};
`
export default Divider
