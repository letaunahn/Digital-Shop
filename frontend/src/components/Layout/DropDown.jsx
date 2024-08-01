import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles'

const DropDown = ({categoriesData, setDropDown}) => {

    const navigate = useNavigate()
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`)
        setDropDown(false);
        window.location.reload()
    }
  return (
    <div className='p-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-lg'>
        {categoriesData && categoriesData.map((i, index) => (
            <div key={index} className={`${styles.normalFlex}`} onClick={() => submitHandle(i)}>
                <img src={i.image_Url} className='w-[25px] h-[25px] object-contain ml-[10px] select-none' alt="" />
                <h3 className='m-3 cursor-pointer select-none'>{i.title}</h3>
            </div>
        ))}
    </div>
  )
}

export default DropDown