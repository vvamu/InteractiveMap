import { useEffect, useRef, useState } from "react";


import ButtonIcon from "../../common/Buttons/ButtonIcon";

const MapButtonBack = ({  mapRef }) => {
   
    return
        <div style={{ display: "flex", alignItems: "center", gridGap: "20px" }}>
           
                 <div>
                        <ButtonIcon
                            src={backIconSrc}
                            alt={"Назад"}
                            disabled={isRender}
                            //onClick={() => mapRef.current.back()}
                        ></ButtonIcon> 
                       
                    {/*     <h1>*/}
                    {/*     {*/}
                    {/*         mapRef.current.current.crs.properties.title*/}
                    {/*            ? mapRef.current.current.crs.properties.title : ""*/}
                    {/*        }*/}
                    {/*</h1>*/}
                </div>
               
                   

        </div>
}

export default MapButtonBack;