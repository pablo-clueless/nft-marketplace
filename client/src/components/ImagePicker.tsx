import React, { ChangeEventHandler, MouseEventHandler } from 'react'
import { FiTrash } from 'react-icons/fi'

interface IImagePicker {
    name: string
    previewURL: any
    onChange: ChangeEventHandler
    onClick: MouseEventHandler
}

const ImagePicker:React.FC<IImagePicker> = ({name, previewURL, onChange, onClick}) => {
  return (
    <div className={style.wrapper}>
        {previewURL === null ? (
            <label className={style.label}>
                <p>Upload file</p>
                <i>.png, .jpg, .jpeg, .svg & .gif only.</i>
                <input  type='file' name={name} onChange={onChange} className='hidden' />
            </label>
        ) : (
            <>
            <img src={previewURL} alt={name} className={style.image} />
            <button type='button' onClick={onClick} className={style.button}>
            <FiTrash />
            </button>
            </>
        )}
    </div>
  )
}

const style = {
    wrapper: `flex flex-col items-center justify-center w-full h-300 border border-slate-600 relative rounded`,
    label: `text-slate-600 w-full h-full text-center grid place-items-center cursor-pointer px-2`,
    image: `w-full h-full object-cover`,
    button: `rounded-full p-2 bg-black text-white text-md absolute left-1 top-1`
  }

export default ImagePicker