import { Route, Routes } from "react-router";
import Guests from "../components/Global/Guests";
import GuestDetails from "../pages/GuestDetails";
import Rooms from "../components/Global/Rooms";
import RoomDetails from "../pages/RoomDetails";
import Bookings from "../components/Global/Bookings";
import BookingDetails from "../pages/BookingDetails";
import Checkin from "../components/Global/Checkin";
import CheckinDetails from "../pages/CheckinDetails";

function AdminRoutes ({setActiveId}) {
    const navRouts = [
        { path: '/guests', element: <Guests setActiveNavId={() => setActiveId('guests')} /> },
        { path: '/guests/:guestId', element: <GuestDetails setActiveNavId={() => setActiveId('guests')}/> },
        { path: '/rooms', element: <Rooms setActiveNavId={() => setActiveId('rooms')}/> },
        { path: '/rooms/:roomNumber', element: <RoomDetails setActiveNavId={() => setActiveId('rooms')} /> },
        { path: '/bookings', element: <Bookings setActiveNavId={() => setActiveId('bookings')} /> },
        { path: '/bookings/:bookingId', element: <BookingDetails setActiveNavId={() => setActiveId('bookings')}/> },
        { path: '/checkin', element: <Checkin setActiveNavId={() => setActiveId('checkin')}/> },
        { path: '/checkin/:checkinId', element: <CheckinDetails setActiveNavId={() => setActiveId('checkin')}/> }
    ]
    
    return (
        <Routes>
            {navRouts.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}

export default AdminRoutes