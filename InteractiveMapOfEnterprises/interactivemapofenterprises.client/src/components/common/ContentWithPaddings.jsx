function ContentWithPaddings({ children, className = "", style = {} }) {
    const defaultStyles = {
        padding: "20px 45px"
    };

    const combinedStyles = {
        ...defaultStyles,
        ...style
    };

    return <div className={className} style={combinedStyles}>{children}</div>;
}

export default ContentWithPaddings;
