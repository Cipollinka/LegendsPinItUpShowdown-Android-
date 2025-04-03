import * as React from "react"
import Svg, { Path } from "react-native-svg"
const RightSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        {...props}
    >
        <Path
            fill="#fff"
            d="M38.06 31.06a1.5 1.5 0 0 0 0-2.12l-9.545-9.547a1.5 1.5 0 1 0-2.122 2.122L34.88 30l-8.486 8.485a1.5 1.5 0 1 0 2.122 2.122l9.546-9.546ZM36 31.5h1v-3h-1v3Z"
        />
    </Svg>
)
export default RightSVG
