import styled from "styled-components";

export const ButtonDiv = styled.div`
    display: flex;
    justify-content: right;
    padding: 5px 15px 5px 5px;
`

export const ChevronButton = styled.button`
    background: inherit;
    color: #fff;
    border: 0;
    cursor: pointer;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.8);
    }
    
`