import { styled } from "@noquarter/ui"

const Tile = styled.div`
  width: 100%;
  background-color: ${p => p.theme.colors.tile};
  box-shadow: ${p => p.theme.shadows.md};
  border-radius: ${p => p.theme.radii.md};
`

export default Tile
