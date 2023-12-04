import { Routes, Route, BrowserRouter } from 'react-router-dom'

export default function Router() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<h1>Login</h1>} />
      <Route path='/register' element={<h1>Register</h1>} />

      <Route path='/' element={<h1>Private</h1>} />

    </Routes>
    </BrowserRouter>

  )
}
