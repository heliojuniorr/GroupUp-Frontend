import styled from "styled-components";

export const Container = styled.header`
    background: #835afd;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Nav = styled.nav`
    display: flex;
    gap: 1rem;

    button {
        padding: 10px;
        border: 0;
        border-radius: 5px;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }


`