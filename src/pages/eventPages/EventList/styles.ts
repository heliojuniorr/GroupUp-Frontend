import styled from "styled-components";

export const Container = styled.main`
    background: #eee;
    padding: 1rem 2rem 1rem 0rem;
    overflow-y: auto;

    li {
        list-style: none;
        margin-left: 0;
    }

`

export const EventListItem = styled.button`
    margin-right: 32px;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem 1rem 1rem;
    width: 100%;
    font-weight: 500;
    background: #835afd;
    color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    border: 0;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
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

        .event-header {
            p {
                font: 500 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 500 16px 'Roboto', sans-serif;
                }
            }
        }

        .event-description {
            p {
                font: 400 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 400 16px 'Roboto', sans-serif;
                }
            }
        }
    }

    img {
        height: 2rem;
    }   
` 