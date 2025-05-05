function CancelButton({text='', action = () => {}, styles}) {
    return (
        <input className={`cursor-pointer border-1 border-mid-gray bg-white text-red px-6 py-2.5 rounded-normal hover:shadow-md hover:shadow-red/10 transition-all duration-300 ${styles}`} type="button" onClick={action} value={text === '' ? 'Отменить' : text} />
    )
}

export default CancelButton