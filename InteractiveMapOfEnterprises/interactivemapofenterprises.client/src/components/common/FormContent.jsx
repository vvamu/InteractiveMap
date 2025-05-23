import ContentWithPaddings from "./ContentWithPaddings";
export default function FormContent({ children, style = {}, backgroundImage, backgroundColor }) {
    const defaultStyles = {
        padding: "20px 45px"
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return <ContentWithPaddings style={{ backgroundImage: backgroundImage??"url(/soligorsk.jpg)", minHeight: "650px", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
        <div style={{
            padding: "5% 5% 2%", margin: "10px 20% 0px", borderRadius: "10px",
            backgroundColor: backgroundColor ?? "rgb(255 255 255 / 70%)",
            
           
        }}>
            {children}
        </div>
</ContentWithPaddings>            ;
}


