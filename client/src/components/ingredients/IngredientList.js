import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class IngredientList extends React.Component {

    render() {
        return (
            <div>
                <Button as={Link} to="/ingredients/add">Create New Ingredient</Button>
            </div>
        );
    }

}

export default IngredientList;