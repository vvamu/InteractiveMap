import { React } from "react";
import FitImage from "../common/FitImage";
import EmergingDiv from "../common/EmergingDiv";
import { getBackgroundUrl } from "./getBackgroundUrl";

export const ComponentIcon = ({ props }) => {
    const backgroundUrl = getBackgroundUrl(props);

    return (
        <EmergingDiv duration={2300} style={{
            width: "100%",
            backgroundImage: backgroundUrl, backgroundSize: "cover", marginTop: "15px"
        }}>
            <div style={{ width: "100%", backdropFilter: "brightness(0.5)", display: "flex", alignItems: "center", justifyContent: "center", }}>
                <FitImage
                    style={{
                        margin: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "white",
                    }}
                    objectFit="contain"
                    src={!props.iconBytes
                        ? "/qualityMark.png"
                        : `data:image/jpeg;base64,${props.iconBytes}`}
                    alt={props.name}
                    width={80}
                    height={80} />
            </div>
        </EmergingDiv>
    );
};

export default ComponentIcon;