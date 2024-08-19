import { toast } from "react-toastify";
import Axios from "./Axios";
const uploadImageService = async (file, setLoading, setProgress) => {
    try {
        setLoading(true)
        const { data } = await Axios.post("/upload", file, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            }
        })
        setLoading(false)
        toast.success("File uploaded successfully")
        return data
    } catch (error) {
        setLoading(false)
        toast.error("File upload failed. Something went wrong")
    }
}
export { uploadImageService }