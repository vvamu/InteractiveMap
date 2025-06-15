import AutoResizeTextArea from "../EditCompanyPage/AutoResizeTextArea";
import ContentWithPaddings from "../common/ContentWithPaddings";
import EmergingDiv from "../common/EmergingDiv";

const ComponentAbout = ({ props }) => {
    return (
        <ContentWithPaddings style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <EmergingDiv duration={ 2700 }><h2 style={{ margin: "20px 0px" }}>
                О предприятии: {props.description != null ? "" : "-"}
            </h2>
            </EmergingDiv>
            {props.description == "" || props.description == null ? null : (
                <EmergingDiv duration={2700} style={{  marginTop: "15px", width:"100%" }}>
                    <AutoResizeTextArea
                        disabled={true}
                        prevData={props}
                        style={{ maxWidth: "98%", minWidth: "98%", border: "none", borderBottom: "3px solid #ffdbdb" }}
                    />
                </EmergingDiv>
            )}
        </ContentWithPaddings>
    )
}

export default ComponentAbout;