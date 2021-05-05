import React, { 
    useState, 
    useEffect, 
    // useLayoutEffect 
} from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { showLoading } from 'react-redux-loading-bar';
import recipeServerAPI from '../../database/recipeServerAPI.js';


const AllRecipesPage = () => {
    const dispatch = useDispatch();
    const allRecipes = useSelector(state => state.userRecipesReducer);
    const [userNames, setUsernames] = useState([]);

    const getUsername = async () => {
        let list = [];
        let owners = [];

        for (let i = 0; i < allRecipes.length; i++) {
        /*  If we've already fetched a recipe's owner's username, let's not waste resources by checking our list
            we've already received from fetch. We'll filter an array of objects containing the user id and their
            username. Then we'll only call fetch if there isn't one. If there is, we'll just what we already
            have without calling fetch. */
            try {
                const owner_id = allRecipes[i].owner;
                const already = owners.find(id => id.owner_id === owner_id);

                if (!already) {
                    const user = await (await fetch(`/user/username/${owner_id}`)).json();
                    list.push(user);
                    owners.push({ owner_id, user });
                } else {
                    list.push(already.user);
                }
            } catch (error) {
                list.push('Account Not Found');
            }
        }
        setUsernames(list);
    }

    useEffect(() => {
        dispatch(showLoading());
        dispatch(recipeServerAPI('allRecipes'));
    }, []);

    useEffect(async () => {
        getUsername();
    }, [allRecipes])

    return (
        // <ul>
        //     { allRecipes.length > 0 && allRecipes.map((recipe, index) => (
        //         <div key={ index } className="row">
        //             <button className="button__link">
        //                 <Link className="button__link--Link" to={`/recipe?id=${recipe._id}`}>View</Link>
        //             </button>
        //             <p>Title: { recipe.title } Cook time: { recipe.cookTime } Instructions: { recipe.instructions }</p>
        //         </div>
        //     ))}
        // </ul>

        <table className="recipes-table">
            <thead>
                <tr>
                    <th>Link</th>
                    <th>Picture</th>
                    <th>Recipe</th>
                    <th>Cook time</th>
                    <th>Submitted</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
            { allRecipes.length > 0 && allRecipes.map((recipe, index) => (
                <tr key={ recipe._id }>
                    <td>
                        <Link className="link" to={`/recipe?id=${recipe._id}`}>View</Link>
                    </td>
                    <td>{ recipe.pictures[0] &&
                        <img
                            className="table-pic"
                            height="130"
                            width="180"
                            src={ `data:image/jpeg;base64,${recipe.pictures[0].picture.data}` } 
                        />
                    }</td>
                    <td>{ recipe.title }</td>
                    <td>{ recipe.cookTime }</td>
                    <td>{ recipe.createdAt }</td>
                    <td>{ userNames[index] }</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export { AllRecipesPage as default }