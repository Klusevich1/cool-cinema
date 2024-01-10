import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={720}
    viewBox="0 0 1000 720"
    backgroundColor="#bababa"
    foregroundColor="#878787"
    {...props}
    >
    <rect x="0" y="0" rx="12" ry="12" width="210" height="280" /> 
    <rect x="0" y="0" rx="12" ry="12" width="210" height="280" /> 
    <rect x="17" y="290" rx="10" ry="10" width="176" height="11" /> 
    <rect x="263" y="0" rx="12" ry="12" width="210" height="280" /> 
    <rect x="280" y="290" rx="10" ry="10" width="176" height="11" />
    <rect x="526" y="0" rx="12" ry="12" width="210" height="280" /> 
    <rect x="543" y="290" rx="10" ry="10" width="176" height="11" />
    <rect x="789" y="0" rx="12" ry="12" width="210" height="280" /> 
    <rect x="806" y="290" rx="10" ry="10" width="176" height="11" />
    <rect x="0" y="358" rx="12" ry="12" width="210" height="280" /> 
    <rect x="17" y="648" rx="10" ry="10" width="176" height="11" /> 
    <rect x="263" y="358" rx="12" ry="12" width="210" height="280" /> 
    <rect x="280" y="648" rx="10" ry="10" width="176" height="11" />
    <rect x="526" y="358" rx="12" ry="12" width="210" height="280" /> 
    <rect x="543" y="648" rx="10" ry="10" width="176" height="11" />
    <rect x="789" y="358" rx="12" ry="12" width="210" height="280" /> 
    <rect x="806" y="648" rx="10" ry="10" width="176" height="11" />
  </ContentLoader>
)

export default MyLoader