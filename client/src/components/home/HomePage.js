import React from 'react';
import CreateAccount from './CreateAccount.js';
import RecipeRoulette from './RecipeRoulette.js';

const HomePage = () => (
    <div>
        <CreateAccount />
        <RecipeRoulette />
    </div>
);

export { HomePage as default }