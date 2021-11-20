import styled from 'styled-components'

export const Container = styled.div`
    > div {
        border-radius: 8px;
        padding: 1rem;
        margin: 5px 1rem 1rem 0;
        width: 100%;
        font-weight: 500;
        background: #835afd;
        color: #fff;

        p {
            color: #fff;
        }

        footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .user-info {
                display: flex;
                align-items: center;

                span {
                    margin-left: 8px;
                    color: #eaeaea;
                    font-size: 14px;
                }
            }
        }
    }
`