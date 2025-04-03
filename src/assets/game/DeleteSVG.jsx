import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DeleteSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={25}
        fill="none"
        {...props}
    >
        <Path
            fill="#393E42"
            d="M6.225 5.311a1 1 0 0 0-1.414 1.414l5.775 5.775-5.775 5.775a1 1 0 1 0 1.414 1.414L12 13.914l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12.5l5.775-5.775a1 1 0 0 0-1.414-1.414L12 11.086 6.225 5.31Z"
        />
    </Svg>
)
export default DeleteSVG
