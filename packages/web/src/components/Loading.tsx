import React, { Fragment, FC } from "react"
import styled from "../application/theme"
import useDebounce from "../lib/hooks/useDebounce"

interface LoadingProps {
  loading: boolean
}

const Loading: FC<LoadingProps> = ({ loading, children }) => {
  const isLoading = useDebounce(loading, 200)
  return (
    <Fragment>
      <StyledContainer loading={isLoading} />
      {!isLoading && children}
    </Fragment>
  )
}

export default Loading

const StyledContainer = styled.div<{ loading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 1s, visibility -0.3s linear 1s;

  background-color: ${p => p.theme.colorPage};
  visibility: ${p => (p.loading ? "visible" : "hidden")};
  opacity: ${p => (p.loading ? 1 : 0)};

  ${p => p.theme.flexCenter};
`
