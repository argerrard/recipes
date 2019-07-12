import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

import LoginForm from './LoginForm';

class LoginModal extends React.Component {

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
                        Login
                    </Button>
                }
            >
                <LoginForm />
            </Modal>
        );
    }

}

export default LoginModal;