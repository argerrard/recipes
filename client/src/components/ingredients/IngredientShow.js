import React from 'react';
import { Item, Table } from 'semantic-ui-react';

class IngredientShow extends React.Component {

    render() {
        return (
            <div>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Item.Header>Orange</Item.Header>
                    </Item.Content>
                    <Item.Description>

                    </Item.Description>
                </Item>
            </Item.Group>

            <Table basic='very'>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell>None</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell>Requires call</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Denied</Table.Cell>
                <Table.Cell>None</Table.Cell>
            </Table.Row>
            </Table.Body>
            </Table>
            </div>
        );
    } 

}

export default IngredientShow;