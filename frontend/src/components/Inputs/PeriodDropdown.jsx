function PeriodDropdown({ styles, action = () => {} }) {
    return (
        <div className={`relative w-full ${styles}`}>
            <label htmlFor="period" className="hidden">Select an option</label>
            <select id="period" className="bg-white border border-mid-gray text-dark text-base rounded-normal focus:ring-purple focus:border-purple w-full px-8 py-2.5 my-2.5 pr-[50px] appearance-none" defaultValue='all' onChange={(evt) => action(evt.target.value)}>
                <option value='all'>Все</option>
                <option value='month'>Текущий месяц</option>
            </select>
            <svg className="absolute top-1/2 right-8 transform -translate-y-1/2 pointer-events-none" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
    )
}

export default PeriodDropdown;