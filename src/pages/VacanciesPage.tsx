import {Container, Grid, Stack, Title, Divider, Group, Text, Autocomplete, Button} from '@mantine/core';
import {Header} from '../components/Header/Header';
import {JobFilters} from '../components/JobFilters/JobFilters';
import {JobsList} from '../components/JobsList/JobsList';
import classes from '../App.module.scss';
import {useMemo, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {IconSearch} from "@tabler/icons-react";
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";
import {useJobsFilters} from '../hooks/useJobsFilters';

function VacanciesPage() {
    const {filters, setSearch} = useJobsFilters();
    const [searchValue, setSearchValue] = useState(filters.search);
    const [prevSearch, setPrevSearch] = useState(filters.search);

    if (prevSearch !== filters.search) {
        setPrevSearch(filters.search);
        setSearchValue(filters.search);
    }

    const [debouncedSearch] = useDebouncedValue(searchValue, 400);
    const {data} = useGetJobsQuery(filters);
    const jobs = data?.jobs;

    const handleSearch = () => {
        setSearch(searchValue.trim());
    };

    const suggestions = useMemo(() => {
        if (!jobs || !debouncedSearch.trim()) {
            return [];
        }

        return [
            ...new Set(
                jobs.flatMap((job) => [
                    job.name,
                    job.company_name,
                ]),
            ),
        ];
    }, [jobs, debouncedSearch]);

    return (
        <>
            <Header/>

            <main>
                <Container size="md" className={classes.container}>
                    <Stack gap="sm">
                        <Stack gap="md">
                            <div className={classes.wrapper}>
                                <Group justify="space-between">
                                    <Group gap="sm" wrap='wrap' align="start" className={classes.wraptitle}
                                           style={{flexDirection: 'column'}}>
                                        <Title order={2} fw={700} className={classes.title}>
                                            Список вакансий
                                        </Title>
                                        <Text c="#0F0F1080">
                                            по профессии Frontend-разработчик
                                        </Text>
                                    </Group>
                                    <Group align="flex-start" gap="8">
                                        <Autocomplete
                                            placeholder="Должность или название компании"
                                            leftSection={<IconSearch size={16}/>}
                                            data={suggestions}
                                            value={searchValue}
                                            onChange={setSearchValue}
                                            onOptionSubmit={(value) => {
                                                setSearchValue(value);
                                                setSearch(value.trim());
                                            }}
                                        />
                                        <Button type="submit" onClick={handleSearch}>Найти</Button>
                                    </Group>
                                </Group>
                            </div>
                        </Stack>
                        <Divider style={{marginLeft: 'calc(50% - 49vw)', marginRight: 'calc(50% - 49vw)'}}/>
                        <Grid>
                            <Grid.Col span={4}>
                                <JobFilters/>
                            </Grid.Col>

                            <Grid.Col span={8}>
                                <JobsList/>
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Container>
            </main>
        </>
    );
}

export default VacanciesPage;
