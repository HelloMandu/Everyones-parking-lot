export default (formData) => {
    const fd = new FormData();
    Object.keys(formData).forEach(key => {
        if (formData[key] !== undefined) fd.append(key, formData[key])
    });
    return fd;
};