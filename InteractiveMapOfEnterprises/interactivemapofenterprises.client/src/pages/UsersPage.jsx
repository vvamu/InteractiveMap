import { useEffect, useState } from "react";

import ContentWithPaddings from "../components/common/ContentWithPaddings"
import ButtonIcon from "../components/common/Buttons/ButtonIcon";
import ListUsers from "../components/UsersPage/ListUsers/ListUsers";
import useLocationChangeLogger from "../hooks/useLocationChangeLogger";
import ErrorBox from "../components/common/InfoBoxs/ErrorBox";

const createIcon = "/create.svg";

export default function UsersPage({ currentUser }) {

  
  const [isActiveSelectedChaptersBox, setIsActiveSelectedChaptersBox] =useState(false);
  const [countUsers, setCountUsers] = useState(0);
    const [errorMessages, setErrorMessages] = useState([])
    const [isVisibleErrorMessages, setIsVisibleErrorMessages] = useState(false);
    useEffect(() => {
        setIsVisibleErrorMessages(!isVisibleErrorMessages);
    },[errorMessages])

    return (
        
        <ContentWithPaddings >
            <ErrorBox
                errors={errorMessages}
                active={isVisibleErrorMessages}
                onClose={() => { setErrorMessages([]); }}
            />
            <div className="pageHeader">
                <h3>Пользователи</h3>
                <div className="pageStats coloredText">Созданных  пользователей: { countUsers}</div>
                {/*<ButtonIcon src={createIcon} alt={"создать"} onClick={() => toCreatePage()} />*/}
            </div>
            <ListUsers setCountUsers={setCountUsers} setErrorMessages={setErrorMessages}>
           </ListUsers>
               
                
        </ContentWithPaddings>
        
  );
}
