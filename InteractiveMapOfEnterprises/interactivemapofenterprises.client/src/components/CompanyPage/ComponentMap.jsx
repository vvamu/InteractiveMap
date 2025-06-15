import Map from "../MapPage/Map/Map";
import { useState } from "react"

export default function ComponentMap(props) {
    const { mapRef } = props;
    const [isRender, setIsRender] = useState(false);
    let image = !props.props.iconBytes
        ? "/qualityMark.png"
        : `data:image/jpeg;base64,${props.props.iconBytes}`;

    const _markers = [
        {
            position: {
                lng: props.props.altitude,
                lat: props.props.latitude,
            },
            name: props.props.name,
            icon: image,
            companyId: props.props.id,
        },
    ];

    //useEffect(() => {
    //    const newMarkers = [props];
    //    if (mapRef && mapRef.current) {
    //        mapRef.current.setCompanies(newMarkers);
    //    }
    //}, [mapRef, props]);

    return (
        <div className="flexContent" style={{ backgroundImage:"url(/companyTypes/wood_to_map.jpg)"}}>
            <Map
                center={{
                    lng: props.props.altitude,
                    lat: props.props.latitude,
                }}
                zoom={12}
                ref={mapRef}
                onRenderStart={() => setIsRender(true)}
                onRenderEnd={() => setIsRender(false)}
                scrollWheelZoom={false}
                isVisibleRegionBorders={false}
                companiess={[props, props, props]}
                markers={_markers}
                style={{ width: "85%", height: "300px", margin:"100px" }}
            />
        </div>
    );
}

{
    /*{data.map((d, index) => {*/
}
{
    /*  const Component = components[d.type];*/
}
{
    /*  return <Component key={index} props={d} />;*/
}
{
    /*})}*/
}
