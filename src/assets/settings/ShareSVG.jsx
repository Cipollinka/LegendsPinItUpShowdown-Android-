import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ShareSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <Path
            fill="#0048D4"
            d="m28.933 13.6-8.8-8c-.666-.667-1.466 0-1.466 1.067v4c-6.267 0-11.6 3.866-14.134 9.066-.933 1.734-1.466 3.6-1.866 5.467-.267 1.333 1.733 2 2.533.8 2.933-4.667 7.867-7.733 13.467-7.733v4.4c0 1.066.8 1.733 1.466 1.066l8.8-8c.534-.533.534-1.6 0-2.133Z"
        />
    </Svg>
)
export default ShareSVG
