import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

class DefaultModal extends React.Component {

    render() {
        return (
            <Modal trigger={this.props.modalTrigger} closeIcon size={this.props.size}>
                <Header icon={this.props.icon} content={this.props.headerMessage} />
                <Modal.Content>
                    <p>{this.props.contentMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color={this.props.button1Color}>
                        <Icon name={this.props.button1Icon} />
                        {this.props.button1Message}
                    </Button>
                    <Button color={this.props.button2Color}>
                        <Icon name={this.props.button2Icon} />
                        {this.props.button2Message}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

}

export default DefaultModal;