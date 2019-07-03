import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

class DefaultModal extends React.Component {

    state = { showModal: false }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    openModal = () => {
        this.setState({ showModal: true })
    }

    render() {
        const button1Click = this.props.button1OnClick ? this.props.button1OnClick : this.closeModal;
        const button2Click = this.props.button2OnClick ? this.props.button2OnClick : this.closeModal;
        return (
            <Modal trigger={
                    <div onClick={()=>this.setState({showModal: true})}>
                        {this.props.modalTrigger}
                    </div>} 
                onClose={this.closeModal}
                closeIcon size={this.props.size} open={this.state.showModal}>
                <Header icon={this.props.icon} content={this.props.headerMessage} />
                <Modal.Content>
                    <p>{this.props.contentMessage}</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color={this.props.button1Color} onClick={button1Click}>
                        <Icon name={this.props.button1Icon} />
                        {this.props.button1Message}
                    </Button>
                    <Button color={this.props.button2Color} onClick={button2Click}> 
                        <Icon name={this.props.button2Icon} />
                        {this.props.button2Message}
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

}

export default DefaultModal;