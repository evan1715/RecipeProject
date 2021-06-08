import React from 'react';

const ConversionsPage = () => (
    <div className="conversions">
        <h1 className="center title">Conversions for your deliciousness</h1>
        
        <h2 className="center title">Dry measurements</h2>
        <table className="conversions__table">
            <thead>
                <tr>
                    <th className="title">Teaspoons</th>
                    <th className="title">Tablespoons</th>
                    <th className="title">Cups</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>3 tsp</td>
                    <td>1 tbsp</td>
                    <td>1/16 cup</td>
                </tr>
                <tr>
                    <td>6 tsp</td>
                    <td>2 tbsp</td>
                    <td>1/8 cup</td>
                </tr>
                <tr>
                    <td>12 tsp</td>
                    <td>4 tbsp</td>
                    <td>¼ cup</td>
                </tr>
                <tr>
                    <td>24 tsp</td>
                    <td>8 tbsp</td>
                    <td>½ cup</td>
                </tr>
                <tr>
                    <td>36 tsp</td>
                    <td>12 tbsp</td>
                    <td>¾ cup</td>
                </tr>
                <tr>
                    <td>48 tsp</td>
                    <td>16 tbsp</td>
                    <td>1 cup</td>
                </tr>
            </tbody>
        </table>

        <h2 className="center title">Liquid measurements</h2>
        <table className="conversions__table">
            <thead>
                <tr>
                    <th className="title">Fluid ounces</th>
                    <th className="title">Cups</th>
                    <th className="title">Pint</th>
                    <th className="title">Quart</th>
                    <th className="title">Gallon</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>8 fl. Oz</td>
                    <td>1 cup</td>
                    <td>1/2 pt</td>
                    <td>1/4 qt</td>
                    <td>1/64 gal</td>
                </tr>
                <tr>
                    <td>16 fl. Oz</td>
                    <td>2 cups</td>
                    <td>1 pt</td>
                    <td>1/2 qt</td>
                    <td>1/16 gal</td>
                </tr>
                <tr>
                    <td>32 fl. Oz</td>
                    <td>4 cups</td>
                    <td>2 pt</td>
                    <td>1 quart</td>
                    <td>1/4 gal</td>
                </tr>
                <tr>
                    <td>128 fl. Oz</td>
                    <td>16 cups</td>
                    <td>8 pt</td>
                    <td>4 quarts</td>
                    <td>1 gal</td>
                </tr>
            </tbody>
        </table>

        <div className="conversions__list">
            <div className="conversions__list--content">
                <h2 className="center title">US Customary to Metric</h2>
                <li>1/5 tsp = 1 mL</li>
                <li>1 tsp = 5 mL</li>
                <li>1 fl. Oz = 30 mL</li>
                <li>1 cup = 237 mL</li>
                <li>1 pt (2 cups) = 473 mL</li>
                <li>1 qt (4 cups) = 0.95 L</li>
                <li>1 gal (16 cups) = 3.8 L</li>
                <li>1 oz = 28 g</li>
                <li>1 lb = 454 g</li>
            </div>
            <div className="conversions__list--content">
                <h2 className="center title">Weight</h2>
                <li>1 gram = 0.035 ounces</li>
                <li>100 grams = 3.5 ounces</li>
                <li>500 grams = 1.1 pounds</li>
                <li>1 kilogram = 35 ounces</li>
            </div>
            <div className="conversions__list--content">
                <h2 className="center title">Volume</h2>
                <li>1 milliliter = 1/5 teaspoon</li>
                <li>5 milliliter = 1 teaspoon</li>
                <li>15 milliliters = 1 tablespoon</li>
                <li>240 milliliters = 1 cup</li>
                <li>1 liter = 34 fluid ounces</li>
            </div>
            <div className="conversions__list--content">
                <h2 className="center title">One cup equals</h2>
                <li>8 fluid ounces</li>
                <li>16 tablespoons</li>
                <li>48 teaspoons</li>
                <li>1/2 pint</li>
                <li>1/4 quart</li>
                <li>1/16 gallon</li>
                <li>240 milliliters</li>
            </div>
        </div>
    </div>
);

export { ConversionsPage as default }