import { Link } from 'react-router-dom';
import { useState } from "react";
import './NavbarStyle.css'
import RecipePosts from '../Recipe-Post/RecipePosts';

function NavBar() {

  const getRandomRecipeLink = () => {
    const recipePosts = RecipePosts;

    // Get all the recipe IDs (keys)
    const recipeIds = Object.keys(recipePosts);

    // Get a random index from the recipeIds array
    const randomIndex = Math.floor(Math.random() * recipeIds.length);

    // Get the random recipe ID
    const randomRecipeId = recipeIds[randomIndex];

    return `/Recipes/${randomRecipeId}`;  // Return the URL path to a random recipe
  };

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
        <div className="hamburger-display">
          <Link to="/"><img className="logo" src="/img/Other-Assets/logo.png" alt="eats by josh logo"/></Link>
          <i className={menuOpen ? "fa-solid fa-arrow-down-short-wide open" : "fa-solid fa-arrow-down-short-wide closed"} onClick={() => {
            setMenuOpen(!menuOpen)
          }}></i>
          <i className={menuOpen ? "fa-solid fa-x closed" : "fa-solid fa-x open"} onClick={() => {
            setMenuOpen(!menuOpen)
          }}></i>
        </div>
        <div className="navdiv">
          <Link to="/" className={menuOpen ? "a open" : "a"}>Home</Link>
          <Link to="/About" className={menuOpen ? "a open" : "a"}>About</Link>
          <Link to="/Recipes" className={menuOpen ? "a open" : "a"}>Recipes</Link>
          <Link to="/Reviews" className={menuOpen ? "a open" : "a"}>Reviews</Link>
          <Link to="/Aichat" className={menuOpen ? "a open" : "a"}>Ai chat</Link>
          <div className="chefchoice">
            <Link to={getRandomRecipeLink()} className={menuOpen ? "a open" : "a"}>chef's choice!</Link>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;