import {ActionIcon, Group, Pill, Stack, Text, TextInput} from '@mantine/core';
import {useState, type KeyboardEvent} from 'react';
import {useJobsFilters} from '../../hooks/useJobsFilters';

export function SkillsInput() {
    const {filters, addSkill, removeSkill} = useJobsFilters();
    const skills = filters.skills;
    const [value, setValue] = useState('');

    const handleAdd = () => {
        const skill = value.trim();
        if (!skill) return;
        addSkill(skill);
        setValue('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAdd();
        }
    };

    return (
        <Stack gap={8}>
            <Text size="sm" fw={600} ta={"left"}>
                Ключевые навыки
            </Text>
            <Group gap={6} wrap="nowrap">
                <TextInput
                    placeholder="Навык"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                    size="xs"
                    style={{width: '100%'}}
                />
                <ActionIcon
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
                        onRemove={() => removeSkill(skill)}
                    >
                        {skill}
                    </Pill>
                ))}
            </Group>
        </Stack>
    );
}
