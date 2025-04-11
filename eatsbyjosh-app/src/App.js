import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from "./components/Home/HomePage";
import Aichat from "./components/ai-chat/ai-chat";
import About from "./components/About/AboutPage"
import Recipes from "./components/Recipes/RecipesPage"
import Reviews from "./components/Reviews/ReviewsPage"
import Footer from './components/Footer/Footer';

import BlogPostPage from './components/Blog-Post/BlogPostPage';
import ReviewPostPage from './components/Reviews/ReviewPostPage';
import RecipePostPage from './components/Recipe-Post/RecipePostPage';


function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Recipes" element={<Recipes/>}/>
        <Route path="/Reviews" element={<Reviews/>}/>
        <Route path="/Aichat" element={<Aichat/>}/>
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/Reviews/:id" element={<ReviewPostPage />} />
        <Route path="/Recipes/:id" element={<RecipePostPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
