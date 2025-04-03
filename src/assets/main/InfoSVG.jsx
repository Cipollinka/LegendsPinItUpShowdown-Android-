import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const InfoSVG = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                fill="#D3D3D3"
                d="M16 2a14 14 0 1 0 14 14A14.027 14.027 0 0 0 16 2Zm0 22.615a1.616 1.616 0 1 1 0-3.231 1.616 1.616 0 0 1 0 3.231Zm1.077-6.582v.12a1.076 1.076 0 1 1-2.154 0v-1.076A1.077 1.077 0 0 1 16 16a2.693 2.693 0 1 0-2.692-2.692 1.077 1.077 0 0 1-2.154 0 4.846 4.846 0 1 1 5.923 4.725Z"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h32v32H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)
export default InfoSVG
