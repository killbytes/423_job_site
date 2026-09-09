import {ActionIcon, Button, Group, Pill, PillsInput, Stack, Text, TextInput} from '@mantine/core';
import { useState, type KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addSkill, removeSkill } from '../../store/jobs/jobsSlice';
import { selectSkills } from '../../store/jobs/jobsSelectors';
import classes from './SkillsInput.module.scss';

export function SkillsInput() {
    const dispatch = useAppDispatch();
    const skills = useAppSelector(selectSkills);
    const [value, setValue] = useState('');

    const handleAdd = () => {
        const skill = value.trim();
        if (!skill) return;

        dispatch(addSkill(skill));
        setValue('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    return (

        // <Stack>
        //     <Text fw={600}>Ключевые навыки</Text>
        //
        //     <Group gap={8}>
        //         <PillsInput.Field placeholder="Навык" />
        //         <Button size="sm" variant="filled" style={{ borderRadius: 4 }}>
        //             +
        //         </Button>
        //
        //         <Pill.Group>
        //             <Pill>JavaScript</Pill>
        //             <Pill>React</Pill>
        //             <Pill>Redux</Pill>
        //             <Pill>Redux Toolkit</Pill>
        //             <Pill>Next.js</Pill>
        //         </Pill.Group>
        //
        //     </Group>
        // </Stack>




    <Stack gap={8}>

            <Text size="sm" fw={600} ta={"left"}>
                Ключевые навыки
            </Text>

                {/*<PillsInput.Field placeholder="Навык" />*/}
                <Group gap={6} wrap="nowrap">
                    <TextInput
                        placeholder="Навык"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                        size="xs"
                        style={{ width: '100%' }}
                    />

                    <ActionIcon
                        className={classes.plus}
                        type="button"
                        variant="light"
                        size="md"
                        radius="sm"
                        aria-label="Добавить навык"
                        onClick={handleAdd}
                    >
                        +
                    </ActionIcon>
                </Group>


                <Group gap={6} wrap="wrap">
                    {skills.map((skill) => (
                        <Pill
                            key={skill}
                            withRemoveButton
                            onRemove={() => dispatch(removeSkill(skill))}
                        >
                            {skill}
                        </Pill>
                    ))}

                </Group>
        </Stack>
    );
}
