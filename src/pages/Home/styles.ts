import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    align-items: stretch;
    max-height: 100vh;
`

export const Brand = styled.aside`
    flex: 6;
    background: #835afd;
    color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 120px 80px;
    height: 100vh;

    img {
        max-width: 320px;
    }

    strong {
        font: 700 36px 'Poppings', sans-serif;
        line-height: 42px;
        margin-top: 16px;
    }

    p {
        font-size: 24px;
        line-height: 32px;
        margin-top: 16px;
        color: #f8f8f8;
    }
    
`

export const Authentication = styled.main`
    flex: 8;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        margin-top: 64px;
        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        background: #ea4335;
        color: #fff;

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
`