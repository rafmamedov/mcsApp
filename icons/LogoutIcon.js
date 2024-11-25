import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LogoutIcon = (props) => (
  <Svg
    {...props}
    width={24}
    height={24}
    fill="none"
  >
    <Path
      stroke="#BDBDBD"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"
    />
  </Svg>
)

export default LogoutIcon;
