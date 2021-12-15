import React, { useContext } from 'react';
import { Routes } from 'react-router-dom'
import { Navigate, Route } from 'react-router';
import { User } from './contexts/UserContext';

import Modal from './components/Modal/Modal';
import Loading from './components/Loading/Loading';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import AccessSection from './components/Sections/AccessSection/AccessSection';
import Coin from './components/Coin/Coin';
import CoinsSection from './components/Sections/CoinsSection/CoinsSection';
import Error404 from './components/Sections/Error404/Error404';
import TestSection from './components/Sections/TestSection/TestSection';

import UserConfig from './components/Sections/UserSection/UserConfig/UserConfig';
import UserSection from './components/Sections/UserSection/UserSection';

function App() {
  const { darkTheme, animations } = useContext(User)

  return (
    <div
      className={
        `app
        ${darkTheme === undefined || darkTheme ? 'darkTheme' : 'lightTheme'}
        ${animations ? 'animations' : 'noAnimations'}`
      }
    >
      <Header />
      < Modal />


      <Loading />


      <Routes>
        <Route path='/test' element={<TestSection />} />
        <Route path='/cripto/test' element={<TestSection />} />
        <Route path='/cripto/:coinToken/test' element={<TestSection />} />

        <Route path='/login' element={<AccessSection />} />
        <Route path='/register' element={<AccessSection sectionStr='register' />} />

        <Route path='/main' element={<TestSection />} />
        <Route path='/cripto' element={<CoinsSection />} />
        <Route path='/cripto/:coinToken' element={<Coin />} />

        <Route path='/user/' element={<UserSection />} />
        <Route path='/user/config' element={<UserConfig />} />

        <Route path='*' element={<Navigate replace to='/404' />} />
        <Route path='/404' element={<Error404 />} />

      </Routes>
      <Footer />
    </ div >
  )
}

export default App;
