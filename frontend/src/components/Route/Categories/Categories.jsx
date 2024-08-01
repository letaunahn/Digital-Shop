import React from 'react'
import { brandingData, categoriesData } from '../../../static/data'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/styles'

const Categories = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className={`${styles.section} hidden sm:block`}>
            <div className={`my-12 flex justify-between w-full shadow-md bg-white p-5 rounded-md`}>
                {
                    brandingData.map((i, index) => (
                        <>
                        <div className='flex items-start' key={index}>
                            {i.icon}
                            <div className='px-3'>
                                <h3 className='font-bold text-sm md:text-base'>{i.title}</h3>
                                <p className='text-xs md:text-sm'>{i.Description}</p>
                            </div>
                        </div>
                        </>
                    ))
                }
            </div>
        </div>
        <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
            <div className='grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]'>
                {categoriesData.map((i) => {
                    const handleSubmit = (i) => {
                        navigate(`/products?category=${i.title}`)
                    }
                    return (
                        <>
                        <div className='w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden pl-2 rounded-md' onClick={() => handleSubmit(i)} key={i.id}>
                            <h5>{i.title}</h5>
                            <img className='w-[120px] object-cover' src={i.image_Url} alt="" />
                        </div>
                        </>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Categories