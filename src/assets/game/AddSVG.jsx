import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const AddSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={56}
        height={56}
        fill="none"
        {...props}
    >
        <Rect width={56} height={56} fill="#FFDDC8" rx={28} />
        <Path
            fill="#fff"
            d="M37 26.5h-7.5V19a1.5 1.5 0 0 0-3 0v7.5H19a1.5 1.5 0 0 0 0 3h7.5V37a1.5 1.5 0 0 0 3 0v-7.5H37a1.5 1.5 0 0 0 0-3Z"
        />
    </Svg>
)
export default AddSVG
