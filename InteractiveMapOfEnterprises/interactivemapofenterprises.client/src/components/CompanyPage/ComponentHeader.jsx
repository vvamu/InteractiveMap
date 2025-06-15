import FitImage from "../common/FitImage";
import EmergingDiv from "../common/EmergingDiv";
import NavLinkWithImage from "../common/NavLinkWithImage";
import OperationType from "../../models/OperationType";
import ApplicationUrl from "../../models/ApplicationUrl";
import ButtonIcon from "../Common/Buttons/ButtonIcon";

const ComponentHeader = ({ props, user, setIsActiveDeleteConfirmationBox, getBackgroundUrl }) => {

    const backgroundUrl = getBackgroundUrl(props);

    props.regionId == "vitebsk" ? "Витебск" : props.regionId == "brest" ? "Брест" : props.regionId == "minsk" ? "Минск"
        : props.regionId == "gomel" ? "Гомель" : props.regionId == "grodno" ? "Гродно" : ""
    return (
        <EmergingDiv duration={0} className="flexContent" style={{ gridGap: "0px", padding: "0px", justifyContent: "flex-start", height:"650px" }}>

            <ImageComponent props={props} />
                <div duration={1000} className="flexContent" style={{
                    flexDirection: "column", alignItems: "center", backgroundImage: backgroundUrl, backgroundSize: "cover",
                    height: "100%", width: "50%"
                }}>
                    <h1 style={{ fontSize: "43px", color: "white", textAlign: "center" }}>{props.name}</h1>
                    <h3 style={{ fontSize: "25px", color: "white", textAlign: "center" }}>{props.category}</h3>
                    <div style={{ fontSize: "18px", color: "white", textAlign: "center" }}>
                            {props.regionId == "vitebsk" ? "Витебск" : props.regionId == "brest" ? "Брест" : props.regionId == "minsk" ? "Минск"
                                : props.regionId == "gomel" ? "Гомель" : props.regionId == "grodno" ? "Гродно" : null}
                    </div>

                    <div className="flexContent" style={{ justifyContent: "space-between" }}>

                        {user?.id == props.creatorId || user?.roles == "Administrator" ? (

                            <div className="flexContent" style={{ justifyContent: "end" }}>
                                <NavLinkWithImage
                                    to={`${ApplicationUrl.Company.app.edit}${props.id}`}
                                    operationType={OperationType.edit}
                                />
                            <ButtonIcon
                                    imgStyle={OperationType.delete.style}
                                    src={OperationType.delete.src}
                                    alt={"Удалить"}
                                    onClick={() => { setIsActiveDeleteConfirmationBox(true) }}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
                  
        </EmergingDiv>
    )
}

const ImageComponent = (props) => {
    let image = !props.props.imageBytes
        ? "/emptyImageGray.jpg"
        : `data:image/png;base64,${props.props.imageBytes}`;
    return (
        <FitImage className="isActiveImage" src={image} style={{ minHeight: "550px",  width: "50%" }} />
    );
    //return <div style={{ backgroundImage: image, height: "580px", width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPositionX: "50%", backgroundPositionY: "center" }} ></div>
};


export default ComponentHeader;

