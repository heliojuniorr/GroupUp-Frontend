import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 1rem;
    gap: 1rem;

    > div {
        display: flex;
        gap: 1rem;

        @media only screen and (max-width: 480px) {
            flex-direction: column;
        }
    }
`