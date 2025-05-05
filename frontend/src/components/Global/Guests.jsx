import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Button from "../Buttons/Button";
import DeletePopup from '../Popups/DeletePopup';
import Header from "../Headers/Header";
import InfoPopup from '../Popups/InfoPopup';
import Loading from "../../additional/Loading.jsx";
import Table from "../Tables/Table";
import DataController from "../../additional/DataController.jsx";


function Guests({ setActiveNavId }) {
    const navigate = useNavigate();

    const [url, setUrl] = useState(import.meta.env.VITE_GUESTS_URL)

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        setActiveNavId();

        setLoading(true);

        DataController.fetchData(url)
            .then((response) => {
                // console.log(response)
                if (Array.isArray(response) && response.length > 0) {
                    const sortedByLastName = response.sort((a, b) => a.secondName.localeCompare(b.secondName))
                    setData(sortedByLastName);
                }
            })
            .catch((error) => console.log(error.status))
            .finally(() => setLoading(false))
    }, [refresh])

    const [addWindow, setAddWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState(false);

    const [guest, setGuest] = useState({});

    const columns = [
        {id: 'secondName', value: 'Фамилия'},
        {id: 'firstName', value: 'Имя'},
        {id: 'patronymic', value: 'Отчество'},
        {id: 'phoneNumber', value: 'Телефон'},
        {id: 'passportNum', value: 'Идентиф. номер'},
    ]

    const handleAdd = () => {
        setLoading(true)
        DataController.handlePost(url, guest)
            .then((response) => {
                if (response.status == 200) {
                    setAddWindow(false);
                    setRefresh((prev) => !prev);
                }
            })
            .catch((error) => console.log(error.status))
            .finally(() => setLoading(false))
    }

    const handleDelete = () => {
        setLoading(true);

        DataController.handleDelete(`${url}/${guest.id}`)
            .catch((error) => console.log(error.status))
            .finally(() => {
                setRefresh((prev) => !prev);
                setDeleteWindow(false);
                setLoading(false);
            })
    }

    const handleEdit = () => {
        setLoading(true)

        DataController.handlePatch(`${url}/${guest.id}`, guest)
            .then((response) => console.log(response.status))
            .catch((error) => console.log(error.status))
            .finally(() => {
                setRefresh((prev) => !prev);
                setEditWindow(false);
                setLoading(false);
            })
    }

    return (
        <>
            {loading && <Loading />}
            <div className='flex justify-between h-min mb-6'>
                <Header text='Гости'/>
                <Button
                    text='Добавить гостя'
                    type='button'
                    actionOnClick={() => setAddWindow(true)}
                />
            </div>
            <Table
                cell="booking_status"
                title='Все гости'
                columns = {columns}
                data = {data}
                actions = {[
                    { item: 'info', callback: (item) =>  navigate(`/admin/guests/${item.id}`)},
                    { item: 'edit', callback: (item) => {
                            setEditWindow(true);
                            setGuest((item))
                        } },
                    { item: 'delete', callback: (item) => { setDeleteWindow(true); setGuest(item) }}
                ]}
            />
            {
                addWindow && 
                <InfoPopup
                    title='Добавить гостя'
                    columns={columns}
                    actionOnClose={() => setAddWindow(false)}
                    actionOnAdd={handleAdd}
                    action={(object) => setGuest(object)}
                    specialCells={['secondName', 'firstName', 'patronymic', 'phoneNumber', 'passportNum']}
                />
            }
            {
                editWindow &&
                <InfoPopup
                    columns={columns}
                    actionOnClose={() => setEditWindow(false)}
                    actionOnAdd={handleEdit}
                    action={(object) => setGuest(object)}
                    entity={guest}
                    title='Изменить гостя'
                    specialCells={['secondName', 'firstName', 'patronymic', 'phoneNumber', 'passportNum']}
                />
            }
            {
                deleteWindow &&
                <DeletePopup
                    text='удалить гостя'
                    actionOnCancel={() => {
                        setDeleteWindow(false);
                    }}
                    actionOnApprove={() => handleDelete()}
                />
            }
        </>
    )
}

export default Guests