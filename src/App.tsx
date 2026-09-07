import { Container, Title } from '@mantine/core';
import "./App.scss";

function App() {
    return (
        <Container size="lg">
            <Title order={1}>
                Список вакансий по профессии Frontend-разработчик
            </Title>
        </Container>
    );
}

export default App;