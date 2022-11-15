import React, { Component, createContext, useEffect, useState } from 'react';
import APIInvoke from '../utils/APPInvoke';
export const DataContext = createContext(undefined);

export function DataProvider(props) {
  const [tokenb, setTokenb] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState()

  const cargarUsuarios = async () => {
    const res = await APIInvoke.invokeGET('/api/auth')
    setTokenb(res)
  }

  useEffect(() => {
    setDatosUsuario(tokenb.usuario)
    if (tokenb === false) {
      if (localStorage.getItem("token") !== null) {
        cargarUsuarios()
      }
    }
  }, [tokenb])

  if (tokenb.msg === 'Token no válido') {
    setTokenb(false)
  }

  return (
    <DataContext.Provider value={{
      tokenb,
      setTokenb,
      cargarUsuarios,
      datosUsuario
    }}>
      {props.children}
    </DataContext.Provider>
  )
}