import { Container, Stack, Title } from '@mantine/core';

import { Header } from '../../components/Header/Header';
import { JobFilters } from '../../components/JobFilters/JobFilters';
import { JobsList } from '../../components/JobsList/JobsList';

import classes from './JobsPage.module.scss';

import {useJobsFilters} from "@/hooks/useJobsFilters.ts";

export function JobsPage() {

    const { filters } = useJobsFilters();
    console.log(filters);

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