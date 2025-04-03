import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const CancelSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        {...props}
    >
        <Rect width={60} height={60} fill="#0048D4" rx={30} />
        <Path
            fill="#fff"
            d="M24.225 22.811a1 1 0 0 0-1.414 1.414L28.586 30l-5.775 5.775a1 1 0 1 0 1.415 1.414L30 31.414l5.775 5.775a1 1 0 0 0 1.414-1.414L31.414 30l5.775-5.775a1 1 0 0 0-1.414-1.414L30 28.586l-5.775-5.775Z"
        />
    </Svg>
)
export default CancelSVG
