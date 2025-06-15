import EmergingDiv from "../common/EmergingDiv";

const ComponentMainInfo = ({ props }) => {
    return (
        
            <EmergingDiv duration={7000} className="flexContent" style={{
                justifyContent: "center",
                alignContent: "center", width: "100%"
                , margin: "50px 0px",
                textAlign: "center",
                flexDirection: "column",
                fontSize: "18px"
            }} >
                <div>
                    Дата основания предприятия: <span>{props?.dateFoundation?.substring(0, 10)}</span>
                </div>

                <div>Сайт: {props.uri ? <a href={props.uri}>{props.uri}</a> : "-"}</div>
            </EmergingDiv>
        
    )
}

export default ComponentMainInfo;