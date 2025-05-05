import NavButton from "./NavButton"
import { useNavigate } from "react-router";
import {useState} from "react";

function NavBar({ activeId, setActiveId = () => {}}) {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem('username'));

    let buttons = [
        {key: 'checkin', value:'Заселить гостя'},
        {key: 'bookings', value:'Бронирования'},
        {key: 'rooms', value:'Номера'},
        {key: 'guests', value:'Гости'},
    ]

    const removeCookie = () => {
        document.cookie = `auth=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        localStorage.removeItem('username');
    };

    return (
        <div className='bg-white max-w-60 h-full rounded-r-big transition-all duration-300 flex flex-col justify-between'>
            <div>
                <img
                    src="../logo.png"
                    width='176px'
                    className='py-10 pl-6'
                    onClick={() => {
                        setActiveId(null);
                        navigate('/admin');
                    }}
                />
                <div>
                    {buttons.map((button, index) =>
                        <NavButton
                            key={index}
                            text={button.value}
                            isActive={activeId === button.key}
                            onClick={() => {
                                navigate(`/admin/${button.key}`);
                                setActiveId(button.key);
                            }}
                            
                        />
                    )}
                </div>
            </div>
            <div className='py-8'>
                <p className='pl-8 font-bold'>{username}</p>
                <p
                    className='pl-8 text-red cursor-pointer'
                    onClick={() => {
                        setActiveId(null);
                        removeCookie();
                        navigate('/');
                }}>Выйти</p>
            </div>
        </div>
    )
}

export default NavBar