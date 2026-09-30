# 423_job_site

Vite + React + TypeScript + Mantine + Redux Toolkit + RTK Query.

[`link-page`](https://killbytes.github.io/423_job_site/)

                    ┌──────────────┐
                    │     URL      │
                    │ search       │
                    │ city         │
                    │ skills       │
                    │ page         │
                    └──────┬───────┘
                           │
                    useJobsFilters
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        JobsPage                 JobFilters
              │                    │       │
              │                    │       │
              ▼                    ▼       ▼
       searchValue              skills    city
              │                    │       │
              ▼                    │       │
        setSearch()          setSkills() setCity()
              │                    │       │
              └────────────────────┴───────┘
                                   │
                                   ▼
                                  URL
                                   │
                                   ▼
                            JobsList
                                   │
                                   ▼
                          useGetJobsQuery