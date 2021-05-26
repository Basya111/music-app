import { useState } from "react"
import { cloudinaryService } from '../../services/cloudinaryService.js'

export const UploadImg = ({ addStationImg }) => {

    const [isUploading, setUploading] = useState(false)

    const onUploadImg = async ev => {
        setUploading(true)
        const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
        setUploading(false)
        addStationImg(secure_url)
    }


    return (
        <section className="uploader">
            <div>
                <label className="cta-btn" htmlFor="imageUploader">{isUploading ? 'Uploading....' : 'Upload Image'}</label>
                <input onChange={onUploadImg} hidden
                    type="file" accept="image/*" id="imageUploader" />
            </div>
            <div className="img-loader">
                {isUploading && <img src="https://res.cloudinary.com/basimgs/image/upload/v1619940492/833_t5lfch.gif" alt="" />}
            </div>
        </section>
    )
}