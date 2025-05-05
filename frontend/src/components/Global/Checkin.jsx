import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import DataController from "../../additional/DataController.jsx";

import Button from "../Buttons/Button";
import Datepicker from "../Inputs/CustomDatepicker";
import Header from "../Headers/Header";
import Input from "../Inputs/Input";
import Loading from "../../additional/Loading.jsx";
import Table from "../Tables/Table";

function Checkin({ setActiveNavId }) {
    const navigate = useNavigate();

    const [url, setUrl] = useState(import.meta.env.VITE_BOOKINGS_URL)

    useEffect(() => {
        setActiveNavId();
    })

    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [numberOfBeds, setNumberOfBeds] = useState(0);

    const [isNotValidDateFrom, setIsNotValidDateFrom] = useState(false);
    const [isNotValidDateTo, setIsNotValidDateTo] = useState(false);
    const [isNotValidNumber, setIsNotValidNumber] = useState(false);

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

    function convertDateToUTC(value) {
        const utcDate = new Date(Date.UTC(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
        ));
        return utcDate.toISOString().split("T")[0];
    }

    const handleFilterSubmit = () => {
        if (!dateFrom) {
            setIsNotValidDateFrom(true)
        }
        if (!dateTo)
            setIsNotValidDateTo(true)
        if (!isNotValidDateFrom && !isNotValidDateTo && !isNotValidNumber) {
            setLoading(true)
            DataController.fetchData(`${url}/available-rooms?bedCount=${numberOfBeds}&checkIn=${dateFrom}&checkOut=${dateTo}`)
                .then((response) => {
                        if (Array.isArray(response) && response.length > 0)
                            setData(response);
                    })
                .catch((error) => console.log(error.status))
                .finally(() => setLoading(false))
        }

    }

    return (
        <>
            {loading && <Loading />}
            <Header text='Заселить гостя' />
            <div className="flex items-center gap-4 my-6">
                <Datepicker
                    text='Дата заезда'
                    action={(date) => {
                        setIsNotValidDateFrom(false);
                        setDateFrom(convertDateToUTC(date));
                    }}
                    error={isNotValidDateFrom}
                />
                &mdash;
                <Datepicker
                    text='Дата выезда'
                    action={(date) => {
                        setIsNotValidDateTo(false);
                        setDateTo(convertDateToUTC(date));
                    }}
                    error={isNotValidDateTo}
                />
                <Input
                    type='number'
                    placeholder='Спальных мест'
                    action={(value) => {
                        setIsNotValidNumber(false);
                        setNumberOfBeds(value);
                    }}
                    ignore={true}
                    styles='max-w-60'
                    error={isNotValidNumber}
                />
                <Button type='submit' text='Искать номера' actionOnClick={handleFilterSubmit}/>
            </div>
            <Table 
                title="Свободные номера"
                columns = {[
                    {id: 'number', value: 'Номер'},
                    {id: 'roomType', value: 'Тип'},
                    {id: 'numberOfBeds', value: 'Кол-во спальных мест'},
                    {id: 'area', value: 'Площадь / м.кв'},
                    {id: 'additionalParameters', value: 'Доп. параметры'},
                    {id: 'price', value: 'Стоимость, BYN / сутки '},
                ]}
                data={data}
                getValue={(value) => getValue(value)}
                actions = {[
                    { item: 'info', callback: (item) => navigate(`/admin/checkin/${item.id}`, { state: {
                                dates: {
                                    checkIn: dateFrom,
                                    checkOut: dateTo
                                },
                                data: item
                            }})},
                ]}
            />
        </>
    )
}

export default Checkin