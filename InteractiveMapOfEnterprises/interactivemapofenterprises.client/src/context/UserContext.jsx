//export default async function UserContext() {
//    const [currentUser, setCurrentUser] = useState(null);

//}
import React from 'react';

const UserContext = React.createContext({
    user: null,
    signIn: () => { },
    signOut: () => { }
})

export default UserContext;