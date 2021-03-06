import styled from "styled-components";

export const Container = styled.main`
    background: #eaeff1;
    padding: 1rem 2rem 1rem 0rem;
    overflow-y: auto;

    .default-message {
        padding: 1rem;
    }

    .filter-field {
        margin-left: 1rem;

        @media only screen and (max-width: 480px) {
            width: 100%;
        }
    }
`