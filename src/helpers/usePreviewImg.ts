import React, { useState } from "react";

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState<string | null | ArrayBuffer>(null);

    const handleImgChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
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

    return { handleImgChange, imgUrl, setImgUrl }
}

export default usePreviewImg