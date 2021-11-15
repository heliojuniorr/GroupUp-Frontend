import styled from 'styled-components'

export const Container = styled.main`
    padding: 1rem;

    > div {
        display: flex;

        @media only screen and (max-width: 480px) {
            flex-direction: column;
        }
    }
`

export const ReturnButton = styled.button`
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    border: 0;
    cursor: pointer;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.85);
    }
`

export const EventList = styled.div`
    margin: 1rem 1rem 1rem 0;
    width: 30rem;

    @media only screen and (max-width: 480px) {
        width: 100%;
    }

    ul {
        min-height: 20rem;
        padding: 1rem;
        border-radius: 5px;
        background: #fff;
        overflow-y: auto;

        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);

        @media only screen and (max-width: 480px) {
            min-height: 0rem;
            max-height: 20rem;
        }
    }
`

export const EventListItem = styled.button`
    border-radius: 8px;
    padding: 1rem;
    margin: 5px 1rem 1rem 0;
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

    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);

    &:hover {
        filter: brightness(0.9);
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &:first-child {
            width: 80vw;
        }
    }

    .event-header {
            p {
                font: 500 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 500 16px 'Roboto', sans-serif;
                }
            }
        }

    img {
        height: 2rem;
    }   
` 

export const MembersList = styled.div`
    margin: 1rem 1rem 1rem 0;
    width: 30rem;

    @media only screen and (max-width: 480px) {
        width: 100%;
    }

    ul {
        min-height: 20rem;
        padding: 1rem;
        border-radius: 5px;
        background: #fff;
        overflow-y: auto;

        box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);

        @media only screen and (max-width: 480px) {
            min-height: 0rem;
            max-height: 20rem;
        }
    }
`

export const MembersListItem = styled.button`
    border-radius: 8px;
    padding: 1rem;
    margin: 5px 1rem 1rem 0;
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

    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);

    &:hover {
        filter: brightness(0.9);
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    > div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        &:first-child {
            width: 80vw;
        }
    }

    .member-header {
            p {
                font: 500 24px 'Roboto', sans-serif;

                @media only screen and (max-width: 480px) {
                    font: 500 16px 'Roboto', sans-serif;
                }
            }
        }

    img {
        height: 2rem;
    }
`