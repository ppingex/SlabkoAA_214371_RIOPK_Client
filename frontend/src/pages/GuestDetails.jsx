import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import ArrowButtonLeft from "../components/Buttons/ArrowButtonLeft";
import DetailTable from "../components/Tables/DetailTables";
import Header from "../components/Headers/Header";
import Loading from "../additional/Loading.jsx";
import Table from "../components/Tables/Table";
import DataController from "../additional/DataController.jsx";

function GuestDetails({ setActiveNavId }) {
    const { guestId } = useParams();

    const navigate = useNavigate();

    const [guestsUrl, setGuestsUrl] = useState(import.meta.env.VITE_GUESTS_URL)
    const [bookingUrl, setBookingUrl] = useState(import.meta.env.VITE_BOOKINGS_URL)

    const [guestData, setGuestData] = useState({});
    const [bookingsData, setBookingsData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setActiveNavId()

        setLoading(true)
        DataController.fetchData(`${guestsUrl}/${guestId}`)
            .then((response) => {
                setGuestData(response)
            })
            .catch((error) => console.log(error.status))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setLoading(true);

        DataController.fetchData(`${bookingUrl}/client/${guestData.passportNum}`)
            .then((response) => {
                setBookingsData(response)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }, [guestData]);


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
                <Header text='Детали гостя' />
            </div>
            <div className="flex flex-col gap-6 mt-6 mb-10">
                <DetailTable
                    title='Гость'
                    columns = {[
                        {id: 'secondName', value: 'Фамилия'},
                        {id: 'firstName', value: 'Имя'},
                        {id: 'patronymic', value: 'Отчество'},
                        {id: 'phoneNumber', value: 'Телефон'},
                        {id: 'passportNum', value: 'Идентиф. номер'},
                    ]}
                    entity= {guestData}
                />
                <Table
                    title='История бронирований'
                    size='small'
                    cell="status"
                    columns = {[
                        {id: 'roomNumber', value: 'Номер'},
                        {id: 'checkInDate', value: 'Дата заезда'},
                        {id: 'checkOutDate', value: 'Дата выезда'},
                        {id: 'roomType', value: 'Тип'},
                        {id: 'status', value: 'Статус'}
                    ]}
                    getValue={getValue}
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

export default GuestDetails