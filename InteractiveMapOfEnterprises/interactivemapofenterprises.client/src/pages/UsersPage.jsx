import { useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import ButtonIcon from "../components/common/Buttons/ButtonIcon";
import ListUsers from "../components/UsersPage/ListUsers/ListUsers";
import useLocationChangeLogger from "../hooks/useLocationChangeLogger";

const createIcon = "/create.svg";

export default function UsersPage({ currentUser }) {

  
  const [isActiveSelectedChaptersBox, setIsActiveSelectedChaptersBox] =useState(false);
  const [countUsers, setCountUsers] = useState(0);

  const handleSelectedChapterTypes = (chapterTypes) => {
    document.location = `/editor?type=create&chapterTypes=${chapterTypes
      .map((c) => c.type)
      .join(",")}`;
    };



    return (

        <ContentWithPaddings >

            <div className="pageHeader">
                <h3>Пользователи</h3>
                <div className="pageStats coloredText">Созданных  пользователей: { countUsers}</div>
                {/*<ButtonIcon src={createIcon} alt={"создать"} onClick={() => toCreatePage()} />*/}
            </div>
            <ListUsers setCountUsers={setCountUsers} />
               
                
        </ContentWithPaddings>
        
  );
}
