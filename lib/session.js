import Cookies from "js-cookie";

const isServer = () => typeof window === 'undefined';

export const setCookie = (key, value) => {
    if (!isServer()) {
        Cookies.set(key, value, {
            expires: 1,
            path: "/"
        });
    }
};

export const removeCookie = key => {
    if (!isServer()) {
        Cookies.remove(key, {
            expires: 1
        });
    }
};

export const getCookie = (key, req) => {
    return !isServer()
        ? getCookieFromBrowser(key)
        : getCookieFromServer(key, req);
};

const getCookieFromBrowser = key => {
    return Cookies.get(key);
};

const getCookieFromServer = (key, req) => {
    if (!req.headers.cookie) {
        return undefined;
    }
    const rawCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith(`${key}=`));
    if (!rawCookie) {
        return undefined;
    }
    return rawCookie.split("=")[1];
};