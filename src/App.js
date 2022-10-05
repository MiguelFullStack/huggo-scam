import React, { useContext } from 'react'
import { Layout } from './components/Layout/Layout'
import { TableCard } from './components/Tables/TableCard'
import { TableEmailAndPhone } from './components/Tables/TableEmailAndPhone'
import { TableToken } from './components/Tables/TableToken'
import { TableUserAll } from './components/Tables/TableUserAll'
import { CheckBoxUtil } from './components/utils/CheckBoxUtil'
import { DropdownUtil } from './components/utils/DropdownUtil'
import { ScamContext } from './context/ScamContext'
import { SocketContext } from './context/SocketContext'


const typeTable = (filteredType, users) => {
  switch (filteredType) {
    case 'all':
        return <TableUserAll users={users} />
    case 'emailAndPhone':
        return <TableEmailAndPhone users={users} />
    case 'token':
        return <TableToken users={users} />
    case 'creditCard':
        return <TableCard users={users} />
    default: 
      return null
  }
}

export const App = () => {

  const {selected, users, filteredType} = useContext(ScamContext);
  const { online } = useContext( SocketContext );
  

  return (
    <Layout>
      <div className='border-b-2 pb-3 flex justify-between items-center'>
        <p className='text-3xl'>{ online ? selected : 'Servidor caido'}</p>
        <p className={online ? 'bg-green-500 px-3 rounded text-white' : 'bg-red-500 px-3 rounded text-white' }>servidor</p>
      </div>
      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-5 bg-white p-5 rounded shadow gap-5'>
        <CheckBoxUtil />
        <DropdownUtil />
      </div>
      <div className='bg-white rounded shadow'>

        {
          users.length === 0 || users === undefined || online === false
          ? <p className='p-5 text-gray-500'>No hay datos disponible</p>
          : typeTable(filteredType, users) 
        }
        
      </div>
    </Layout>
  )
}