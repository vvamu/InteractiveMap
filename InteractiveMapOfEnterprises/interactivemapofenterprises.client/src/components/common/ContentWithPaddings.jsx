import EmergingDiv from "./EmergingDiv";
function ContentWithPaddings({ children, className = "", style = {}, duration }) {
    const defaultStyles = {
        padding: "1% 5%",
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return (<div><EmergingDiv className={`${className}`} style={combinedStyles} duration={duration ?? 2000 }> 
            
        {children}</EmergingDiv></div>
    )
}

export default ContentWithPaddings;
