import { Close } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { displayForm } from '../../../store/form';

export const CustomModal = ({children}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            displayForm(false)
        );
    };

    return (
        <>
            <Overlay>
                <ModalContainer>
                    
                    <ModalHeader>
                        <Typography variant="h3" sx={{fontSize: 20, color: '#1660cd'}}>Nuevo vendedor</Typography>
                    </ModalHeader>

                    <CloseModalButton onClick={handleClick}>
                        <Close/>
                    </CloseModalButton>

                    {children}

                </ModalContainer>
            </Overlay>
        </>
    )
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.5);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContainer = styled.div`
    width: 450px;
    min-height: 100px;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,0.2) 0px, 7px, 29px, 0px;
    padding: 20px;
    background: #fff;
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;
`;

const CloseModalButton = styled.button`
    position: absolute;
    top: 16px;
    right: 20px;
    
    width: 30px;
    height: 30px;
    background: none;
    border: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1660cd;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #F2F2F2
    }
`;