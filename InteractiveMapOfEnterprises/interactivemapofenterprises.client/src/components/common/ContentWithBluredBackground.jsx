import ContentWithPaddings from "./ContentWithPaddings";
import EmergingDiv from "./EmergingDiv";
function ContentWithBluredBackground({ children, backgroundImage, duration, className = "", style = {} } ) {
    const defaultStyles = {
        padding: "1% 5%"
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return (
        <div className="full-width" style={{
        backgroundImage: backgroundImage ?? "url(/soligorsk.jpg)", minHeight: "650px", backgroundSize: "cover",}}>
            <div className="full-width" style={{ backdropFilter: "contrast(0.8) blur(3px)" }}>
                <ContentWithPaddings duration={duration} style={combinedStyles}>         
                        {children}   
                </ContentWithPaddings>
        </div> </div>
    )
}

export default ContentWithBluredBackground;
