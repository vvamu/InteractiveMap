import ContentWithPaddings from "../ContentWithPaddings"
import { useState } from 'react';


export default function Footer() {
    const [isHovering, setIsHovering] = useState(false);



    return (<div className="flexContent" style={{ padding: "20px", marginTop: "40px", gridGap: "5px", boxShadow:"rgba(100, 100, 111, 0.1) 0px 7px 29px 0px" }} >
        2025
        <a href="https://t.me/shmtyanaa" className="flexContent" style={{ gridGap: "5px" }}>
            @shmtyanaa <img height="20x" width="20px" src="/icons/telegram-svgrepo-com.svg" style={{ filter:"blur()" }} onHover={() => { setIsHovering(!isHovering) }}></img>
        </a>
    </div>)
}