import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DataController from "../../additional/DataController.jsx";

import Button from "../Buttons/Button";
import DeletePopup from '../Popups/DeletePopup';
import Header from "../Headers/Header";
import InfoPopup from '../Popups/InfoPopup';
import Loading from "../../additional/Loading.jsx";
import Table from "../Tables/Table";

function Rooms({ setActiveNavId }) {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [addWindow, setAddWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false)
    const [deleteWindow, setDeleteWindow] = useState(false);

    const [room, setRoom] = useState({});

    const columns = [
        {id: 'number', value: 'Номер'},
        {id: 'roomType', value: 'Тип'},
        {id: 'roomStatus', value: 'Статус'},
        {id: 'numberOfBeds', value: 'Кол-во спальных мест'},
        {id: 'area', value: 'Площадь / м.кв'},
        {id: 'additionalParameters', value: 'Доп. параметры'},
        {id: 'price', value: 'Стоимость / сутки'},
    ]

    const columnsForEdit = [
        {id: 'number', value: 'Номер'},
        {id: 'roomType', value: 'Тип'},
        {id: 'numberOfBeds', value: 'Кол-во спальных мест'},
        {id: 'area', value: 'Площадь / м.кв'},
        {id: 'additionalParameters', value: 'Доп. параметры'},
        {id: 'price', value: 'Стоимость / сутки'},
    ]

    const columnsForAdd = [
        {id: 'number', value: 'Номер'},
        {id: 'roomType', value: 'Тип'},
        {id: 'numberOfBeds', value: 'Кол-во спальных мест'},
        {id: 'area', value: 'Площадь / м.кв'},
        {id: 'additionalParameters', value: 'Доп. параметры'},
        {id: 'price', value: 'Стоимость / сутки'},
    ]

    useEffect(() => {
        setActiveNavId();

        setLoading(true);
        DataController.fetchData(`${import.meta.env.VITE_ROOMS_URL}`)
            .then((response) => {
                const sortedByNumber = response.sort((a, b) => a.number - b.number)
                setData(sortedByNumber);
            })
            .catch((error) => console.log(error.name))
            .finally(() => setLoading(false))
    }, [refresh])



    const getCellStyle = (value) => {
        switch (value) {
            case 'OCCUPIED':
                return { name: 'Занят', style: 'text-red' };
            case 'FREE':
                return { name: 'Свободен', style: 'text-green' };
            default:
                return '';
        }
    }

    const getValue = (value) => {
        switch (value) {
            case 'LUX':
                return 'Люкс';
            case 'STANDARD':
                return 'Стандарт';
            case 'ECONOMY':
                return 'Эконом'
        }
    }

    const handleAdd = () => {
        setLoading(true);

        DataController.handlePost(`${import.meta.env.VITE_ROOMS_URL}`, room)
            .then((response) => {
                console.log(room)
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
        DataController.handleDelete(`${import.meta.env.VITE_ROOMS_URL}/${room.id}`)
            .catch((error) => console.log(error.status))
            .finally(() => {
                setRefresh((prev) => !prev);
                setLoading(false);
                setDeleteWindow(false);
            })
    }

    const handleEdit = () => {
        setLoading(true);

        DataController.handlePatch(`${import.meta.env.VITE_ROOMS_URL}/${room.id}`,
            room)
            .then((response) => console.log(response.status))
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false);
                setEditWindow(false);
                setRefresh((prev) => !prev);
            })

    }

    return (
        <>
            {loading && <Loading />}
            <div className='flex justify-between h-min mb-6'>
                <Header text='Номера'/>
                <Button
                    text='Добавить номер'
                    type='button'
                    actionOnClick={() => setAddWindow(true)}
                />
            </div>
            <Table
                title='Все номера'
                cell="roomStatus"
                getCellStyle={(value) => getCellStyle(value)}
                columns = {columns}
                getValue = {getValue}
                data = {data}
                actions = {[
                    { item: 'info', callback: (item) =>  navigate(`/admin/rooms/${item.number}`)},
                    { item: 'edit', callback: (item) => {
                        setEditWindow(true); setRoom(item);
                    }},
                    { item: 'delete', callback: (item) => { setDeleteWindow(true); setRoom(item) }}
                ]}
            />
            {
                addWindow && 
                <InfoPopup
                    title='Добавить номер'
                    columns={columnsForAdd}
                    actionOnClose={() => setAddWindow(false)}
                    action={(object) => setRoom(object)}
                    actionOnAdd={handleAdd}
                    specialCells={['additionalParameters']}
                    entity={room}
                />
            }
            {
                editWindow &&
                <InfoPopup
                    columns={columnsForEdit}
                    actionOnClose={() => setEditWindow(false)}
                    actionOnAdd={handleEdit}
                    action={(object) => setRoom(object)}
                    specialCells={['additionalParameters']}
                    entity={room}
                    title='Изменить номер'
                />
            }
            {
                deleteWindow &&
                <DeletePopup
                    text='удалить номер'
                    actionOnCancel={() => {
                        setDeleteWindow(false);
                    }}
                    actionOnApprove={() => {
                        handleDelete();
                    }}
                />
            }
        </>
    )
}

export default Rooms