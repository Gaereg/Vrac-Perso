import { useState, type ReactNode } from 'react';
import { AlertContext, AlertDispatchContext } from './AlertContext.ts';
import { TAlertError } from 'src/contexts/Alert/types';
import { CodeErr } from './CodeErr.ts';


const AlertProvider = ({children}: {children: ReactNode}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>('')
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [msgSuccess, setMsgSuccess] = useState<string>('')

  const addError = (err: TAlertError) => {
    setMsgError(CodeErr[err.table]?.[err.code] || err.message)
    setIsError(true)
  }
  const addSuccess = (msg: string) => {}
  const closeAlert = () => {
    setIsError(false);
    setIsSuccess(false);
  }

  return(
    <AlertContext.Provider value={{isError, msgError, isSuccess, msgSuccess}}>
      <AlertDispatchContext value={{addError, addSuccess, closeAlert}}>
        {children}
      </AlertDispatchContext>
    </AlertContext.Provider>
  )
}

export default AlertProvider;