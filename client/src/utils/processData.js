import moment from 'moment';

const processData = (data) => {
    let recipes = data;

    //If it's just one recipe, the length will be undefined, so only process it based on one recipe.
    if (data.length === undefined) {
        recipes.createdAt = moment(recipes.createdAt).format('MMM Do, YYYY');
        recipes.updatedAt = moment(recipes.updatedAt).format('MMM Do, YYYY');
        for (let  j = 0; j < data.pictures.length; j++) {
            const buffer = data.pictures[j].picture.data;
            const bytes = new Uint8Array(buffer);
            let binary = '';

            bytes.forEach((byte) => binary += String.fromCharCode(byte));

            recipes.pictures[j].picture.data = (btoa(binary));
            recipes.pictures[j].picture.type = "Binary";
        }
        return recipes;
    }
    //If it's an array of recipes, the length will be defined, so process all recipes.
    else if (data.length !== undefined) { 
        for (let i = 0; i < data.length; i++) {
            recipes[i].createdAt = moment(recipes[i].createdAt).format('MMM Do, YYYY');
            recipes[i].updatedAt = moment(recipes[i].updatedAt).format('MMM Do, YYYY');
            for (let j = 0; j < data[i].pictures.length; j++) {
                const buffer = data[i].pictures[j].picture.data;
                const bytes = new Uint8Array(buffer);
                let binary = '';

                bytes.forEach((byte) => binary += String.fromCharCode(byte));

                recipes[i].pictures[j].picture.data = (btoa(binary));
                recipes[i].pictures[j].picture.type = "Binary"
            }
        }
        return recipes;
    }
}

export { processData as default }