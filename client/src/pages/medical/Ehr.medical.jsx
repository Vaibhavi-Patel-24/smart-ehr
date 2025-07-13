import React from 'react'
import EhrContainer from '../../components/EhrContainer'
import { data } from '../../data/ehr';
function Ehrmedical() {
  return (
    <div className='mt-10 mb-10'>
        <EhrContainer data={data}/>
    </div>
  )
}

export default Ehrmedical