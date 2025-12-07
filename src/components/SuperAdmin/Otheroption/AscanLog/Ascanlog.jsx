import React ,{useRef}from 'react'
import AscanlogDropdown from './AscanlogDropdown'
import AscanPloting from '../../Ascan/AscanPloting'
import AscanDownload from '../../Ascan/AscanDownload';

const Ascanlog = () => {
  const chartRef = useRef(null);

  return (
    <div className='w-[100%] h-[100%] flex flex-col gap-2'>
      <div className='h-[10%] border border-gray-700 rounded-xl flex items-center'>
        <AscanDownload/>
        <AscanlogDropdown/>
      </div>
      <div className='h-[88%] border border-gray-700 parent-bg'>
        <AscanPloting chartRef={chartRef} />
    </div>
    </div>
  )
}

export default Ascanlog
