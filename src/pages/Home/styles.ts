import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    max-height: 100vh;
    max-width: 100vw;
`

export const Authentication = styled.main`
    display: flex;
    flex-direction: column;
    
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100%;

    padding: 5rem 5rem;
    background: #835afd;
    color: #fff;

    img {
        max-width: 20rem;
    }

    button {
        margin-top: 32px;
        height: 50px;
        width: 320px;
        border-radius: 8px;
        font-weight: 500;
        background: #ea4335;
        color: #fff;
        padding: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
        border: 0;

        transition: filter 0.2s;

        img {
            margin-right: 8px;
        }

        &:hover {
            filter: brightness(0.9);
        }
    }

    strong {
        font: 700 36px 'Poppings', sans-serif;
        line-height: 42px;
        margin-top: 16px;

        @media only screen and (max-width: 480px) {
            font: 700 24px 'Poppings', sans-serif;
        }
    }

    p {
        font-size: 24px;
        line-height: 32px;
        margin-top: 16px;
        
        @media only screen and (max-width: 480px) {
            font-size: 16px;
            line-height: 24px;
        }
    }
`