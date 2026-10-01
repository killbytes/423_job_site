import {Autocomplete, Button, Container, Divider, Grid, Group, Stack, Text, Title} from '@mantine/core';
import { JobFilters } from '../../components/JobFilters/JobFilters';
import { JobsList } from '../../components/JobsList/JobsList';
import classes from './JobsPage.module.scss';
import {useJobsFilters} from "@/hooks/useJobsFilters.ts";
import {IconSearch} from "@tabler/icons-react";
import {useEffect, useMemo, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";

export function JobsPage() {
    const {filters, setSearch} = useJobsFilters();
    const [searchValue, setSearchValue] = useState(filters.search);
    const {data} = useGetJobsQuery(filters);
    const [debouncedSearch] = useDebouncedValue(searchValue, 500);

    useEffect(() => {
        setSearchValue(filters.search);
    }, [filters.search]);

    // useEffect(() => {
    //     if (debouncedSearch !== filters.search) {
    //         setSearch(debouncedSearch);
    //     }
    // }, [debouncedSearch, filters.search, setSearch]);

    const handleSearch = () => {
        setSearch(searchValue);
    };

    const handleSearchOption = (value: string) => {
        setSearchValue(value);
        setSearch(value);
    };


    const suggestions = useMemo(() => {
        if (!data?.jobs || !debouncedSearch.trim()) {
            return [];
        }

        return [
            ...new Set(
                data.jobs.flatMap((job) => [
                    job.name,
                    job.company_name,
                ]),
            ),
        ];
    }, [data?.jobs, debouncedSearch]);


    return (
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
                                    leftSection={<IconSearch size={16} />}
                                    data={suggestions}
                                    value={searchValue}
                                    onChange={setSearchValue}
                                    onOptionSubmit={handleSearchOption}
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
    );
}