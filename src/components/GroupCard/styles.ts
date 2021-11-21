import styled from "styled-components";

export const Container = styled.div`
`

export const GroupListItem = styled.button`
    border-radius: 8px;
    padding: 1rem;
    width: 100%;
    font-weight: 500;
    background-color: var(--backgroundColor);
    color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0;

    transition: filter 0.2s;

    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);

    :not(:disabled) {
        margin: 1rem;
        cursor: pointer;
    }

    &:hover:not(:disabled) {
        filter: brightness(0.9);
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 15px;

        &:first-child {
            width: 80vw;
        }

        > div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 1rem

        }

        .group-header {
            p {
                font: 500 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 500 16px 'Roboto', sans-serif;
                }
            }
        }

        .group-description {
            p {
                font: 400 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 400 16px 'Roboto', sans-serif;
                }
            }
        }
    }

    img {
        height: 3rem;
    }    
`