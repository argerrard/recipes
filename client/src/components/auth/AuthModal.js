import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

class AuthModal extends React.Component {

    state = { showModal: false }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    openModal = () => {
        this.setState({ showModal: true })
    }

    render() {
        return (
            <Modal
                open={this.state.showModal}
                onClose={this.closeModal}
                closeIcon
                trigger={
                    <Button primary onClick={()=>this.setState({showModal: true})}>
                        {this.props.buttonName}
                    </Button>
                }
            >
                {this.props.authForm}
            </Modal>
        );
    }

}

export default AuthModal;