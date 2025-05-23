import { useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import ButtonIcon from "../components/common/Buttons/ButtonIcon";
import  ListUsers  from "../components/UsersPage/ListUsers/ListUsers";

const createIcon = "/create.svg";

export default function UsersPage({ currentUser }) {
  const [isActiveSelectedChaptersBox, setIsActiveSelectedChaptersBox] =
    useState(false);

  const handleSelectedChapterTypes = (chapterTypes) => {
    document.location = `/editor?type=create&chapterTypes=${chapterTypes
      .map((c) => c.type)
      .join(",")}`;
    };

    return (
        
        <ContentWithPaddings>
            
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "50px" }}>
                        <h3>Пользователи</h3>
                        {/*<ButtonIcon src={createIcon} alt={"создать"} onClick={() => toCreatePage()} />*/}
                    </div>
                    <ListUsers />
               
                
        </ContentWithPaddings>
        
  );
}
