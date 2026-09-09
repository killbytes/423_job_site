import {Container, Grid, Stack, Title, Divider, Group, Text, Autocomplete, Button} from '@mantine/core';
import { Header } from './components/Header/Header';
import { JobFilters } from './components/JobFilters/JobFilters';
import { JobsList } from './components/JobsList/JobsList';
import classes from './App.module.scss';
import {useMemo, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {setSearch} from "@/store/jobs/jobsSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {selectJobsFilters, selectSearch} from "@/store/jobs/jobsSelectors.ts";
import {IconSearch} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import {useGetJobsQuery} from "@/store/jobs/jobsApi.ts";

function App() {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSearch);
    const [searchValue, setSearchValue] = useState(search);
    const [debouncedSearch] = useDebouncedValue(searchValue, 400);
    const filters = useAppSelector(selectJobsFilters);
    const { data } = useGetJobsQuery(filters);

    console.log('filters ', filters)
    // console.log('filters ', filters)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            search: search,
        },
    });

    const handleSearch = (values: { search: string }) => {
        dispatch(setSearch(values.search.trim()));
        console.log('send')
    };

    const handleSubmit = form.onSubmit(handleSearch);

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
        <>
            <Header />

            <main>
                <Container size="md" className={classes.container}>
                    <Stack gap="sm">
                        <Stack gap="xl">
                            <div className={classes.wrapper}>
                                <Group justify="space-between">
                                    <Group wrap='wrap' align="start" className={classes.wraptitle} style={{flexDirection:'column'}}>
                                        <Title order={2} fw={700} className={classes.title}>
                                            Список вакансий
                                        </Title>
                                        <Text>
                                            по профессии Frontend-разработчик
                                        </Text>
                                    </Group>

                                    <form onSubmit={handleSubmit}>
                                        <Group align="flex-start" gap="8">
                                            <Autocomplete
                                                placeholder="Должность или название компании"
                                                leftSection={<IconSearch size={16} />}
                                                key={form.key('search')}
                                                data={suggestions}
                                                value={searchValue}
                                                onChange={setSearchValue}
                                                onOptionSubmit={(value) => {
                                                    setSearchValue(value);
                                                    handleSearch({ search: value });
                                                }}
                                            />

                                            <Button type="submit">
                                                Найти
                                            </Button>
                                        </Group>
                                    </form>
                                </Group>
                            </div>
                        </Stack>
                        <Divider style={{marginLeft: 'calc(50% - 49vw)', marginRight: 'calc(50% - 49vw)'}} />
                        <Grid>
                            <Grid.Col span={4}>
                                <JobFilters />
                            </Grid.Col>

                            <Grid.Col span={8}>
                                <JobsList />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Container>
            </main>
        </>
    );
}

export default App;




import {Container, Grid, Stack, Title, TextInput, Divider, Group, Text, Autocomplete} from '@mantine/core';
import { Header } from './components/Header/Header';
import { JobFilters } from './components/JobFilters/JobFilters';
import { JobsList } from './components/JobsList/JobsList';
import classes from './App.module.scss';
import {useEffect, useState} from "react";
import {useDebouncedValue} from "@mantine/hooks";
import {setSearch} from "@/store/jobs/jobsSlice.ts";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {selectSearch} from "@/store/jobs/jobsSelectors.ts";
import {IconSearch} from "@tabler/icons-react";
import { useForm } from '@mantine/form';

function App() {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectSearch);
    const [searchValue, setSearchValue] = useState(search);
    const [debouncedSearch] = useDebouncedValue(searchValue, 400);


    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            search: '',
        },
    });

    const handleSubmit = form.onSubmit((values) => {
        dispatch(setSearch(values.search.trim()));
        // dispatch(setPage(1));
    });

    useEffect(() => {
        if (debouncedSearch !== search) {
            dispatch(setSearch(debouncedSearch));
        }
    }, [debouncedSearch, dispatch, search]);

    return (
        <>
            <Header />

            <main>
                <Container size="md" className={classes.container}>
                    <Stack gap="sm">
                        <Stack gap="xl">
                            <div className={classes.wrapper}>
                                <Group justify="space-between">
                                    <Group wrap='wrap' align="start" className={classes.wraptitle} style={{flexDirection:'column'}}>
                                        <Title order={2} fw={700} className={classes.title}>
                                            Список вакансий
                                        </Title>
                                        <Text>
                                            по профессии Frontend-разработчик
                                        </Text>
                                    </Group>
                                    <TextInput
                                        label="Поиск"
                                        placeholder="Должность или название компании"
                                        leftSection={<IconSearch size={16} />}
                                        value={searchValue}
                                        onChange={(event) => setSearchValue(event.currentTarget.value)}
                                    />

                                    <form onSubmit={handleSubmit}>
                                        <Group align="flex-start" gap="8">
                                            {/*<Autocomplete*/}
                                            {/*    placeholder="Должность или название компании"*/}
                                            {/*    data={[]}*/}
                                            {/*    key={form.key('search')}*/}
                                            {/*    {...form.getInputProps('search')}*/}
                                            {/*/>*/}

                                            <Button type="submit">
                                                Найти
                                            </Button>
                                        </Group>
                                    </form>
                                </Group>
                            </div>
                        </Stack>
                        <Divider style={{marginLeft: 'calc(50% - 49vw)', marginRight: 'calc(50% - 49vw)'}} />
                        <Grid>
                            <Grid.Col span={4}>
                                <JobFilters />
                            </Grid.Col>

                            <Grid.Col span={8}>
                                <JobsList />
                            </Grid.Col>
                        </Grid>
                    </Stack>
                </Container>
            </main>
        </>
    );
}

export default App;