import { Container, Stack, Title } from '@mantine/core';

import { Header } from '../../components/Header/Header';
import { JobFilters } from '../../components/JobFilters/JobFilters';
import { JobsList } from '../../components/JobsList/JobsList';

import classes from './JobsPage.module.css';

export function JobsPage() {
    return (
        <>
            <Header />

            <main>
                <Container size="lg" className={classes.container}>
                    <Stack gap="xl">
                        <Title order={1} className={classes.title}>
                            Список вакансий по профессии Frontend-разработчик
                        </Title>

                        <JobFilters />
                        <JobsList />
                    </Stack>
                </Container>
            </main>
        </>
    );
}