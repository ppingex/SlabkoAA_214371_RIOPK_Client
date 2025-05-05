import { useState } from "react";

import AdminRoutes from "../routes/AdminRoutes"
import NavBar from "../components/Navigation/NavBar"

function AdminPanel() {
    const [activeId, setActiveId] = useState(null);

    return (
        <div className='h-full grid grid-cols-[240px_1fr]'>
            <NavBar activeId={activeId} setActiveId={(value) => setActiveId(value)}/>
            <div className='my-[42px] mx-10'>
                <AdminRoutes
                    setActiveId={(value) => setActiveId(value)}
                />
            </div>
        </div>
    )
}

export default AdminPanel