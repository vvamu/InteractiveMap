import { useCookies } from 'react-cookie';


const useCookieHandler = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['UserId']);

    const handleCookie = ({ cookieName, cookieValue = "", isRemove = false }) => {
        if (!isRemove) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 7);
            setCookie(cookieName, cookieValue, { expires: expirationDate });

            
        } else {
            removeCookie(cookieName);
        }
        return cookies;
    };

    return { cookies, handleCookie };
};
export default useCookieHandler;