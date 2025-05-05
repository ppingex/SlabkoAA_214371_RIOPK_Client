const HandleFromSubmit = (formDataRef) => {
    const formData = new FormData(formDataRef.current);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    return formObject;
}

export default HandleFromSubmit