import React from 'react';
import Button from 'arui-feather/button';
import { Modal } from './Modal';
import Input from 'arui-feather/input';
import FormField from 'arui-feather/form-field';
import styled from 'styled-components';
import Heading from 'arui-feather/heading';

type Props = {
    className?: string;
    onSave: (name: string) => void;
};

const StyledModal = styled(Modal)`
    padding: 60px;
`;

const StyledHeading = styled(Heading)`
    margin-top: 0;
`;

export const SaveRequestButton = React.memo((props: Props) => {
    const inputNodeRef = React.useRef<Input | null>(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [requestName, setRequestName] = React.useState('');
    const handleSaveClick = React.useCallback(() => {
        setIsModalVisible(true);
        if (inputNodeRef.current) {
            inputNodeRef.current.focus();
        }
    }, [inputNodeRef.current]);
    const handleCancelClick = React.useCallback(() => {
        setIsModalVisible(false);
        setRequestName('');
    }, []);
    const handleModalSaveClick = React.useCallback(() => {
        setIsModalVisible(false);
        props.onSave(requestName);
        setRequestName('');
    }, [requestName]);

    return (
        <>
            <Button
                text='Save'
                size='l'
                className={ props.className }
                onClick={ handleSaveClick }
            >
                Save
            </Button>
            <StyledModal
                isVisible={ isModalVisible }
                isClosable={ true }
                onClose={ handleCancelClick }
            >
                <StyledHeading size='s'>
                    Save request
                </StyledHeading>
                <FormField>
                    <Input
                        value={ requestName }
                        onChange={ setRequestName }
                        width='available'
                        label='Request name'
                        ref={ inputNodeRef }
                    />
                </FormField>
                <div>
                    <Button
                        onClick={ handleCancelClick }
                    >
                        Cancel
                    </Button>
                    <Button
                        view='extra'
                        onClick={ handleModalSaveClick }
                        disabled={ !requestName }
                    >
                        Save
                    </Button>
                </div>
            </StyledModal>
        </>
    )
});
