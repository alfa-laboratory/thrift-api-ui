import React from 'react';
import styled from 'styled-components';
import IconBankAlfa from 'arui-feather/icon/brand/bank-alfa';
import Heading from 'arui-feather/heading';
import ThemeProvider from 'arui-feather/theme-provider';

type Props = {
    className?: string;
};

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
`;

const StyledHeading = styled(Heading)`
    margin: 0 0 0 10px !important;
`;

export const Header = React.memo((props: Props) => {
    return (
        <ThemeProvider theme='alfa-on-color'>
            <StyledHeader className={ props.className }>
                <IconBankAlfa size='xl' />
                <StyledHeading size='m'>
                    Thrift API UI
                </StyledHeading>
            </StyledHeader>
        </ThemeProvider>
    );
});
