import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'

function FilterButton({ img, filterBy }) {
    return (
        <div className='filter-button'>
            <img  src={img} alt={filterBy} />
            <li>{filterBy}</li>
        </div>
    )
}

FilterButton.propTypes = {
    img: PropTypes.string.isRequired,
    filterBy: PropTypes.string.isRequired
}

export default function FilterIngredient() {
    return (
        <div className='center'>
            <div  className='filter-ingredient-container'>

                <div>Filter by Ingredient</div>

                <div>
                        <Link to='/search=placeholder'><FilterButton filterBy='Chicken' img='https://images.pexels.com/photos/262945/pexels-photo-262945.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' /></Link>
                        <Link to='/search=placeholder'><FilterButton filterBy='Beef' img='https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' /></Link>
                        <Link to='/search=placeholder'><FilterButton filterBy='Pork' img='https://images.pexels.com/photos/929137/pexels-photo-929137.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' /></Link>
                        <Link to='/search=placeholder'><FilterButton filterBy='Fish' img='https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' /></Link>
                        <Link to='/search=placeholder'><FilterButton filterBy='Vegetarian' img='https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' /></Link>
                </div>
            </div>
        </div>
    )
}