import Button from "../Buttons/Button";
import CancelButton from "../Buttons/CancelButton";

function DeletePopup({ text, actionOnCancel = () => {}, actionOnApprove = () => {} }) {
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white rounded-big">
                <p className="font-bold text-base py-6 px-10 text-dark font-inter text-center">Вы действительно хотите {text}?</p>
                <div className="flex items-center justify-center gap-2.5 my-2.5">
                    <CancelButton
                        text="Нет"
                        styles='w-25'
                        action={actionOnCancel}
                    />
                    <Button
                        type="submit"
                        text='Да'
                        styles='w-25!'
                        actionOnClick={actionOnApprove}
                    />
                </div>
            </div>
        </div>
    )
}

export default DeletePopup;