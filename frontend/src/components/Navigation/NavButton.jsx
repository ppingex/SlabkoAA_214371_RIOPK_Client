function NavButton({text, isActive = false, onClick = () => {} }) {
    return (
        <div
            className={`py-2.5 px-6 cursor-pointer transition-all duration-300 ${isActive ? 'bg-light-purple text-purple' : 'bg-transparent text-dark hover:bg-light-gray'}`}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default NavButton;