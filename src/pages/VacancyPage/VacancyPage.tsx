import {Container, Badge, Center, Group, Loader, Paper, Stack, Text, Title} from '@mantine/core';
import { useParams } from 'react-router';
import { useGetJobByIdQuery } from '../../store/jobs/jobsApi';

const formatSalary = (salary: string) => {
    const value = Number(salary);

    if (!Number.isFinite(value)) {
        return salary;
    }

    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
};

const formatSpace = (space: 'office' | 'remote' | 'hybrid') => {
    const labels = {
        office: 'В офисе',
        remote: 'Удалённо',
        hybrid: 'Гибрид',
    };

    return labels[space];
};

const formatSkills = (skills: string) => {
    return skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);
};

export function VacancyPage() {
    const { id } = useParams<{ id: string }>();
    const jobId = Number(id);
    const { data, isLoading, isError } = useGetJobByIdQuery(jobId, {
        skip: !Number.isInteger(jobId), // example /vacancies/abc
    });

    if (isLoading) {
        return (
            <Center>
                <Loader />
            </Center>
        );
    }

    if (isError || !data?.job) {
        return (
            <Center>
                <Text>Вакансия не найдена.</Text>
            </Center>
        );
    }

    const { job } = data;
    const skills = formatSkills(job.skills);

    return (
        // <Paper>
        //     <Stack>
        //         <Title order={1}>
        //             {job.name}
        //         </Title>
        //
        //         <Text fw={500}>
        //             {job.company_name}
        //         </Text>
        //
        //         <Group gap="xs">
        //             <Text>{job.city}</Text>
        //             <Text>·</Text>
        //             <Text>{formatSpace(job.space)}</Text>
        //         </Group>
        //
        //         <Text size="xl" fw={600}>
        //             {formatSalary(job.salary)}
        //         </Text>
        //
        //         <Group gap="xs">
        //             {skills.map((skill) => (
        //                 <Badge key={skill} variant="light">
        //                     {skill}
        //                 </Badge>
        //             ))}
        //         </Group>
        //
        //         <Text>
        //             Опыт: {job.experience}
        //         </Text>
        //     </Stack>
        // </Paper>

        <Container size="md" className="vacancy-container" mt={24}>
            <Stack gap={24}>
                <Paper radius="xl" p={24} className="vacancy-card">
                    <Stack gap={10}>
                        <Title order={3} className="vacancy-title">
                            {job.name}
                        </Title>

                        <Group gap={18}>
                            <Text size="sm" fw={500}>
                                {formatSalary(job.salary)}
                            </Text>

                            <Text size="sm" c="dimmed">
                                {job.experience}
                            </Text>
                        </Group>

                        <Stack gap={4} mt={8}>
                            <Text size="sm" c="dimmed" ta="left">
                                {job.company_name}
                            </Text>

                            <Badge
                                color="blue"
                                variant="filled"
                                size="xs"
                                w="fit-content"
                            >
                                {formatSpace(job.space)}
                            </Badge>

                            <Text size="sm" ta="left">
                                {job.city}
                            </Text>
                        </Stack>
                    </Stack>
                </Paper>

                {/* Description */}
                <Paper radius="xl" p={24} className="vacancy-card">
                    <Stack gap={12}>
                        <Title order={4} ta="left">
                            Компания
                        </Title>

                        <Text className="description" ta="left">
                            {job.about_company}
                        </Text>

                        <Text fw={600} size="sm" ta="left">
                            О вакансии:
                        </Text>

                        <Text className="description" ta="left">
                            {job.description}
                        </Text>
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
}