import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/navBar/NavBar'
import Container from '../components/dulces/Container';

export default function Home() {

  return (
    <>
      <NavBar />
      <Container />
    </>
  )
}
