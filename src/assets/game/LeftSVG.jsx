import * as React from "react"
import Svg, { Path } from "react-native-svg"
const LeftSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M21.94 31.06a1.5 1.5 0 0 1 0-2.12l9.545-9.547a1.5 1.5 0 1 1 2.122 2.122L25.12 30l8.486 8.485a1.5 1.5 0 1 1-2.122 2.122L21.94 31.06Zm2.06.44h-1v-3h1v3Z"
        />
    </Svg>
)
export default LeftSVG
