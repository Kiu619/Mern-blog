import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import Footer from './components/Footer'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import ScrollToTop from './components/ScrollToTop'
import About from './pages/About'
import CreatePost from './pages/CreatePost'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PostPage from './pages/PostPage'
import Projects from './pages/Projects'
import Search from './pages/Search'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import UpdatePost from './pages/UpdatePost'

function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<AdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
