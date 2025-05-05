function Button({ text, type = '', actionOnClick = () => {}, actionOnSubmit = () => {}, styles }) {
    return (
        <input
            className={`cursor-pointer bg-purple rounded-normal text-white px-8 py-2.5 w-min hover:shadow-md hover:shadow-purple/30 transition-all duration-300 ${styles}`}
            type={type}
            onClick={actionOnClick}
            onSubmit={actionOnSubmit}
            value={text}/>
    )
}

export default Button