import { useEffect, useState } from 'react';
import {
    Autocomplete,
    Button,
    Container,
    Divider,
    Grid,
    Group,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { useJobsFilters } from '../../hooks/useJobsFilters';
import { JobFilters } from '../../components/JobFilters/JobFilters';
import { JobsList } from '../../components/JobsList/JobsList';

import classes from './JobsPage.module.css';

export function JobsPage() {
    const {
        filters,
        setSearch,
    } = useJobsFilters();

    const [searchValue, setSearchValue] = useState(filters.search);

    useEffect(() => {
        setSearchValue(filters.search);
    }, [filters.search]);

    const handleSearch = () => {
        setSearch(searchValue);
    };

    const handleSearchOption = (value: string) => {
        setSearchValue(value);
        setSearch(value);
    };

    return (
        <Container size="md" className={classes.container}>
            <Stack gap="sm">
                <Stack gap="md">
                    <div className={classes.wrapper}>
                        <Group justify="space-between">
                            <Group
                                gap="sm"
                                wrap="wrap"
                                align="start"
                                className={classes.wraptitle}
                                style={{ flexDirection: 'column' }}
                            >
                                <Title
                                    order={2}
                                    fw={700}
                                    className={classes.title}
                                >
                                    Список вакансий
                                </Title>

                                <Text c="#0F0F1080">
                                    по профессии Frontend-разработчик
                                </Text>
                            </Group>

                            <Group
                                align="flex-start"
                                gap="8"
                            >
                                <Autocomplete
                                    placeholder="Должность или название компании"
                                    leftSection={<IconSearch size={16} />}
                                    data={suggestions}
                                    value={searchValue}
                                    onChange={setSearchValue}
                                    onOptionSubmit={handleSearchOption}
                                />

                                <Button
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Найти
                                </Button>
                            </Group>
                        </Group>
                    </div>
                </Stack>

                <Divider
                    style={{
                        marginLeft: 'calc(50% - 49vw)',
                        marginRight: 'calc(50% - 49vw)',
                    }}
                />

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
    );
}