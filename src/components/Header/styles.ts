import styled from "styled-components";

export const Container = styled.header`
    background: #101F33;
    height: 50px;
    display: flex;
    align-items: center;
`

export const Nav = styled.nav`
    display: flex;

    button {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: inherit;
        color: #ddd;
        padding: 5px;
        border: 0;
        border-radius: 5px;

        margin-left: 15px;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.8);
        }
    }


`