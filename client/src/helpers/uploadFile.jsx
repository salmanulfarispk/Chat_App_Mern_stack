const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`

const uploadFile = async(file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "chat-app-file");

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const responseData = await response.json();
        return responseData.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default uploadFile;
