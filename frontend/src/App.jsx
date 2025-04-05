import { Routes, Route, Navigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import TransactionPage from './pages/TransactionPage'
import Header from './components/ui/atoms/Header'
import NotFound from './pages/NotFoundPage'

import { GET_AUTHENTICATED_USER } from './graphql/queries/user.query'

function App() {

  const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  console.log("Authenticated User:", data)
  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route path='/' element={ data?.authUser ? <HomePage/> : <Navigate to="/login"/> } />
        <Route path='/login' element={ !data?.authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path='/signup' element={ !data?.authUser ? <SignUpPage/>: <Navigate to="/"/>} />
        <Route path='/transaction/:id' element={ data?.authUser ? <TransactionPage/>: <Navigate to="/login"/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
