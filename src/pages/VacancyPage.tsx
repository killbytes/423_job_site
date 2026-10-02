import {Container, Title} from '@mantine/core';
import {useParams} from 'react-router';

function VacancyPage() {
    const {id} = useParams();

    return (
        <Container size="md">
            <Title order={2}>Страница вакансии</Title>
            <p>ID: {id}</p>
        </Container>
    );
}

export default VacancyPage;
