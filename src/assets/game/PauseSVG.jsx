import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const PauseSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        {...props}
    >
        <Rect
            width={60}
            height={60}
            fill="#0048D4"
            rx={30}
            transform="matrix(-1 0 0 1 60 0)"
        />
        <G clipPath="url(#a)">
            <Path
                fill="#fff"
                d="M33 25a1 1 0 0 1 2 0v10a1 1 0 0 1-2 0V25Zm-8 0a1 1 0 0 1 2 0v10a1 1 0 0 1-2 0V25Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M18 18h24v24H18z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default PauseSVG
