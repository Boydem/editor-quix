export const uploadService = {
    uploadImg,
}
function uploadImg(ev) {
    const CLOUD_NAME = 'yaronshapira-com'
    const UPLOAD_PRESET = 'mg6aefx9'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
    })
        .then(res => res.json())
        .then(res => {
            return res
        })
        .catch(err => console.error(err))
}
