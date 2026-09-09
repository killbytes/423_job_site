import {Badge, Button, Group, Paper, Stack, Text, Title} from '@mantine/core';
import type {Job} from '../../shared/types';
import classes from './JobCard.module.scss';

const spaceLabels = {
    remote: 'Можно удалённо',
    office: 'Офис',
    hybrid: 'Гибрид',
} as const;

interface JobCardProps {
    job: Job;
}

export function JobCard({job}: JobCardProps) {
    return (
        <Paper withBorder radius="md" p="lg" className={classes.card}>
            <Stack gap="xs">
                <Title order={3} className={classes.title}>
                    {job.name}
                </Title>

                <Group gap="xs" align="baseline">
                    <Text fw={600}>{Number(job.salary).toLocaleString('ru-RU')} ₽</Text>
                    <Text size="sm" c="dimmed">
                        Опыт {job.experience}
                    </Text>
                </Group>

                <Badge variant="filled" color="blue" className={classes.badge}>
                    {spaceLabels[job.space]}
                </Badge>

                <Text ta="left" size="sm" c="dimmed">
                    {job.company_name}
                </Text>

                <Text ta="left" size="sm">{job.city}</Text>

                <Button color="#0F0F10" size="sm" w="fit-content" mt="xs">
                    Смотреть вакансию
                </Button>
            </Stack>
        </Paper>
    );
}
