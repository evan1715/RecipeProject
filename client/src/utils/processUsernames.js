import { recipeOwnersAction } from "../actions/allRecipes";

const processUsernames = (data) => async dispatch => {
    let list = [];
    let owners = [];

    for (let i = 0; i < data.length; i++) {
    /*  If we've already fetched a recipe's owner's username, let's not waste resources by checking our list
        we've already received from fetch. We'll filter an array of objects containing the user id and their
        username. Then we'll only call fetch if there isn't one. If there is, we'll just what we already
        have without calling fetch. */
        try {
            const owner_id = data[i].owner;
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
    return dispatch(recipeOwnersAction(list));
}

export { processUsernames as default }