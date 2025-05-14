import { useCookies } from 'react-cookie';

const useCookieHandler = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['UserId']);

    const handleCookie = ({ cookieName, cookieValue = "", isRemove = false }) => {
        if (!isRemove) {
            setCookie(cookieName, cookieValue);
        } else {
            removeCookie(cookieName);
        }
        return cookies;
    };

    return { cookies, handleCookie };
};
export default useCookieHandler;