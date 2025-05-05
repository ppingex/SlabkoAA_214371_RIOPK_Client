import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import DataController from "../additional/DataController.jsx";

import ArrowButtonLeft from "../components/Buttons/ArrowButtonLeft";
import DetailTable from "../components/Tables/DetailTables";
import Header from "../components/Headers/Header";
import Loading from "../additional/Loading.jsx";
import Table from "../components/Tables/Table";

function RoomDetails({ setActiveNavId }) {
    const { roomNumber } = useParams();

    const navigate = useNavigate();

    const [roomsUrl, setRoomsUrl] = useState(import.meta.env.VITE_ROOMS_URL)
    const [bookingUrl, setBookingUrl] = useState(import.meta.env.VITE_BOOKINGS_URL)

    const [roomData, setRoomData] =  useState({});
    const [bookingsData, setBookingsData] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setActiveNavId();
        setLoading(true);

        Promise.all([
            DataController.fetchData(`${roomsUrl}/num/${roomNumber}`),
            DataController.fetchData(`${bookingUrl}/room/${roomNumber}`)
        ])
            .then(([room, bookings]) => {
                setRoomData(room);
                setBookingsData(bookings)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    const getCellStyle = (value) => {
        switch (value) {
            case 'PAST':
                return {
                    name: 'Прошедшее',
                    style: 'text-gray'};
            case 'CANCELLED':
                return {
                    name: 'Отменено',
                    style:'text-red'};
            case 'CURRENT':
                return {
                    name: 'Текущее',
                    style: 'text-green'};
            case 'PENDING':
                return {
                    name: 'Предстоящее',
                    style: 'text-blue'
                }
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

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-col gap-6">
                <ArrowButtonLeft
                    action={() => navigate(-1)}
                />
                <Header text='Детали номера' />
            </div>
            <div className="flex flex-col gap-6 mt-6 mb-10">
                <DetailTable
                    title='Номер'
                    cell='roomType'
                    getValue={(value) => getValue(value)}
                    columns = {[
                        {id: 'number', value: 'Номер'},
                        {id: 'roomType', value: 'Тип'},
                        {id: 'numberOfBeds', value: 'Количество спальных мест'},
                        {id: 'area', value: 'Площадь'},
                        {id: 'additionalParameters', value: 'Доп. параметры'},
                        {id: 'price', value: 'Стоимость, BYN/сутки'},
                    ]}
                    entity= {roomData}
                />
                <Table
                    title='История бронирований'
                    size="small"
                    cell="status"
                    columns = {[
                        {id: 'clientLastName', value: 'Фамилия'},
                        {id: 'clientFirstName', value: 'Имя'},
                        {id: 'clientPatronymic', value: 'Отчество'},
                        {id: 'clientPhone', value: 'Телефон'},
                        {id: 'checkInDate', value: 'Заезд'},
                        {id: 'checkOutDate', value: 'Выезд'},
                        {id: 'status', value: 'Статус'},
                    ]}
                    data = {bookingsData}
                    actions = {[
                        { item: 'info', callback: (item) => navigate(`/admin/bookings/${item.id}`) },
                    ]}
                    getCellStyle={(value) => getCellStyle(value)}
                />
            </div>
        </>
    )
}

export default RoomDetails