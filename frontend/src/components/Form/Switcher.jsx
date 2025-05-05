function Switcher({ buttons, selectedButton, action, styles = '', buttonStyle = '' }) {
    return (
        <div className={`flex rounded-normal border-1 border-mid-gray ${styles}`}>
            <button
                key={buttons[0].id}
                type='button'
                onClick={() => action(buttons[0].id)}
                className={`text-center py-1 px-4 uppercase font-bold text-xs rounded-l-normal border-r-1 border-mid-gray ${buttonStyle} ${
                    selectedButton === buttons[0].id
                    ? 'bg-light-purple text-dark'
                    : 'text-dark/50'
                }`}
                >
                {buttons[0].value}
            </button>
            <button
                key={buttons[1].id}
                type='button'
                onClick={() => action(buttons[1].id)}
                className={`text-center py-1 px-4 uppercase font-bold text-xs rounded-r-normal ${buttonStyle} ${
                    selectedButton === buttons[1].id
                    ? 'bg-light-purple text-dark'
                    : 'text-dark/50'
                }`}
                >
                {buttons[1].value}
            </button>
        </div>
    )
}

export default Switcher