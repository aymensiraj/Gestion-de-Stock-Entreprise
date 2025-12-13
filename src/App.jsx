import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import NavBar from './components/NavBar'
import AddMovement from './pages/Movements/AddMovement'
import MovementsList from './pages/Movements/MovementsList'
import ArticlesList from './pages/Articles/ArticlesList'
import AddArticle from './pages/Articles/AddArticle'
import EditArticle from './pages/Articles/EditArticle'
import ArticleDetails from './pages/Articles/ArticleDetails'

function App() {
  return (
    
    <Router basename="/Gestion-de-Stock-Entreprise">
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movements/add" element={<AddMovement />} />
        <Route path="/movements" element={<MovementsList />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/add" element={<AddArticle />} />
        <Route path="/articles/edit/:id" element={<EditArticle />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />
      </Routes>
    </Router>
  )
}

export default App
