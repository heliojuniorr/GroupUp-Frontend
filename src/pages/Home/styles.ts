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

    img {
        max-height: 50vh;
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

    button {
        background: #ea4335;
        color: #fff;
    }
`