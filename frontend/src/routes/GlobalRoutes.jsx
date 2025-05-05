import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from "react-router";
import AdminPanel from "../pages/AdminPanel";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound.jsx";

function GlobalRoutes() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const nameEQ = `auth=`;
        let value = '';
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                value = cookie.substring(nameEQ.length);
            }
        }
        setIsAuth(value)
    }, []);

    const navRouts = [
        { path: '/', element: <Navigate to="/login" replace /> },
        { path: '/login', element: <LoginPage />},
        { path: '*', element: <NotFound />}
    ]

    return (
        <Routes>
            {navRouts.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
            {isAuth && <Route path='/admin/*' element={<AdminPanel/>} />}
        </Routes>
    )
}

export default GlobalRoutes