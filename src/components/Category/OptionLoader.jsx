import React from "react"
import ContentLoader from "react-content-loader"

const OptionLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={50}
    viewBox="0 0 1100 50"
    backgroundColor="#3F3F3F"
    foregroundColor="#878787"
    {...props}
    >
    <rect x="0" y="0" rx="12" ry="12" width="1100" height="50" /> 
  </ContentLoader>
)

export default OptionLoader