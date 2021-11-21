import './styles'
import { MessageParams } from '../../interfaces/types'
import { useAuth } from '../../hooks/useAuth'
import { Container } from './styles'


export function Message({ message }: MessageParams) {
    const { user } = useAuth()

    return (
        <>
            {
                user && (
                    <Container>
                        <div>
                            <p>{message.content}</p>
                            <footer>
                                <div className="user-info">
                                    <span>- {message.authorName}</span>
                                </div>
                            </footer>
                        </div>
                    </Container>
                )
            }
        </>
    )
}