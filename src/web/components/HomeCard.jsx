import { useRouter } from "next/router"
import styled from "styled-components"

export function HomeCard ({ module, openBackDrop ,children }) {

    const router = useRouter()

    const { title, description } = module
    
    const handleClick = () => {
        openBackDrop()
        const href = title.toLowerCase()
        router.push(href)
    }

    return (
        <Card onClick={handleClick}>
            <IconContainer>{children}</IconContainer>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </Card>
    )
}

const Card = styled.div`
    background-color: #212429;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    min-width: 700px;
    min-height: 200px;
    border-radius: 25px;
    cursor: pointer;
    max-width: 200px;

    &:hover {
		background: #282b31;
        
	}
`

const IconContainer = styled.section`
    display: flex;
`

const CardTitle = styled.h3`
    color: #fff;
`

const CardDescription = styled.p`
    color: #ffffffd8;
`