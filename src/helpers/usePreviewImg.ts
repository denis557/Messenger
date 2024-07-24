import { useState } from "react";

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState<string | null | ArrayBuffer>(null);

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if(file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImgUrl(reader.result);
            }

            reader.readAsDataURL(file);
        } else {
            console.error('Wrong file type');
            setImgUrl(null)
        }
    }
    return { handleImgChange, imgUrl }
}

export default usePreviewImg