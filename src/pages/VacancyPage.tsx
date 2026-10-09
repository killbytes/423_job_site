import {Badge, Button, Center, Container, Group, Loader, Paper, Stack, Text, Title} from '@mantine/core';
import {Link, useParams} from 'react-router';
import {useGetJobByIdQuery} from '../store/jobs/jobsApi';
import {Header} from '../components/Header/Header';

const spaceLabels = {
    remote: 'Можно удалённо',
    office: 'Офис',
    hybrid: 'Гибрид',
} as const;

function VacancyPage() {
    const {id} = useParams();
    const numericId = Number(id);
    const isValidId = Number.isInteger(numericId) && numericId > 0;

    const {data, isLoading, isError} = useGetJobByIdQuery(numericId, {
        skip: !isValidId,
    });

    if (!isValidId) {
        return (
            <Container size="md">
                <Header/>
                <Title order={2}>Некорректный ID вакансии</Title>
                <Text>Пожалуйста, проверьте ссылку.</Text>
            </Container>
        );
    }

    if (isLoading) {
        return (
            <Container size="md">
                <Header/>
                <Center>
                    <Loader/>
                </Center>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container size="md">
                <Header/>
                <Title order={2}>Ошибка загрузки</Title>
                <Text>Не удалось загрузить вакансию. Попробуйте позже.</Text>
            </Container>
        );
    }

    if (!data?.job) {
        return (
            <Container size="md">
                <Header/>
                <Title order={2}>Вакансия не найдена</Title>
                <Text>Вакансия с таким ID не существует.</Text>
            </Container>
        );
    }

    const {job} = data;

    return (
        <>
            <Header/>
            <Container size="md">
                <Stack gap="md">
                    <Link to="/vacancies" style={{textDecoration: 'none', width: 'fit-content'}}>
                        <Button variant="subtle" size="sm">
                            ← Назад к списку
                        </Button>
                    </Link>

                    <Paper withBorder radius="md" p="lg">
                        <Stack gap="xs">
                            <Title order={2}>{job.name}</Title>

                            <Group gap="xs" align="baseline">
                                <Text fw={600} size="lg">
                                    {Number(job.salary).toLocaleString('ru-RU')} ₽
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Опыт {job.experience}
                                </Text>
                            </Group>

                            <Badge variant="filled" color="blue">
                                {spaceLabels[job.space]}
                            </Badge>

                            <Text size="sm" c="dimmed">
                                {job.company_name}
                            </Text>

                            <Text size="sm">{job.city}</Text>

                            <Text size="sm" c="dimmed">
                                Опубликовано: {new Date(job.published_at).toLocaleDateString('ru-RU')}
                            </Text>

                            <Text size="sm">{job.short_description}</Text>

                            <Text size="sm">
                                <Text span fw={600}>Навыки: </Text>
                                {job.skills}
                            </Text>
                        </Stack>
                    </Paper>

                    <Paper withBorder radius="md" p="lg">
                        <Stack gap="xs">
                            <Title order={3}>Описание</Title>
                            <Text>{job.description}</Text>
                        </Stack>
                    </Paper>

                    <Paper withBorder radius="md" p="lg">
                        <Stack gap="xs">
                            <Title order={3}>О компании</Title>
                            <Text>{job.about_company}</Text>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </>
    );
}

export default VacancyPage;
