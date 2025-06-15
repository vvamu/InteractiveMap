import ContentWithPaddings from "./ContentWithPaddings";
import EmergingDiv from "./EmergingDiv";
import ContentWithBluredBackground from "./ContentWithBluredBackground";
export default function FormContent({ children, style = {}, backgroundImage, backgroundColor, duration }) {
    const defaultStyles = {
        padding: "5% 5% 2%", margin: "10px 20% 0px", borderRadius: "10px",
        backgroundColor: backgroundColor ?? "rgb(255 255 255 / 70%)", height: "120%", minHeight: "300px"
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return (
        <ContentWithBluredBackground backgroundImage={backgroundImage}>
        
                <EmergingDiv duration={duration ?? 5000} style={
                combinedStyles
                     }>
                        {children}
                </EmergingDiv>

        </ContentWithBluredBackground >
    );
}


