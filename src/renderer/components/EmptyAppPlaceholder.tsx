import React from 'react';
import styled from 'styled-components';
import Button from 'arui-feather/button';

const StyledEmptyAppPlaceholder = styled.div`
    text-align: center;
    margin-top: 50px;
    width: 100%;
    height: 100%;
`;

const StyledParagraph = styled.div`
    font-size: 18px;
    padding: 10px;
`;

type Props = {
    onChooseClick: () => void;
};

export const EmptyAppPlaceholder = (props: Props) => (
    <StyledEmptyAppPlaceholder>
        <StyledParagraph>
            Please choose thrift source path:
        </StyledParagraph>
        <Button
            text='Choose'
            onClick={ props.onChooseClick }
        />
    </StyledEmptyAppPlaceholder>
);
