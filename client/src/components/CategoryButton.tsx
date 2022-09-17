import React from 'react'

interface Props {
    name: string
    icon: React.ReactNode
}

const CategoryButton:React.FC<Props> = ({name, icon}) => {
  return (
    <div className={style.button}>
        <div className={style.icon}>{icon}</div>
        <p className={style.name}>{name}</p>
    </div>
  )
}

const style = {
    button: `flex items-center gap-2 bg-slate-300 p-1 text-sm rounded-md cursor-pointer`,
    icon: `grid place-items-center bg-white text-slate-900 p-1 rounded-md`,
    name: `text-slate-900 font-[600]`
}

export default CategoryButton