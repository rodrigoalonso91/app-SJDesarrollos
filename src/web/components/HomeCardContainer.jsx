import styled from "styled-components"

export function HomeCardContainer ({ children }) {
    return (
        <CardContainer>
            {children}
        </CardContainer>
    )
}

const CardContainer = styled.section`
	padding-top: 125px;
	padding-left: 125px;
	display: flex;
	gap: 50px;
	flex-wrap: wrap;
`