import {Anchor, Container, Group, Indicator, Text} from '@mantine/core';
import classes from './Header.module.scss';
import Logo from '@/shared/assets/logo.png';
import User from '@/shared/assets/user.png';

export function Header() {
    return (
        <header className={classes.header}>
            <Container size="lg" className={classes.inner}>
                <Group justify="space-between" style={{width: '100%'}}>
                    <Text className={classes.logo} fw={600}>
                        <img src={Logo} alt="Logo" className={classes.logoimg} />
                        .FrontEnd
                    </Text>
                    <Group justify="space-between">
                        <Anchor href="#" c="#000000" fw={700} underline="never" className={classes.link}>
                            Вакансии FE
                            <Indicator
                                size={8}
                                color="blue"
                                offset={2}
                                position="top-end"
                                style={{paddingRight:"16px", paddingBottom:"4px"}}
                            />
                        </Anchor>
                        <Anchor href="#" c="#0F0F1080" underline="never" className={classes.about}>
                            <img src={User} alt="Logo" className={classes.logoimg} />
                            Обо мне
                        </Anchor>
                    </Group>
                    <Text style={{width: '100px'}}/>
                </Group>
            </Container>
        </header>
    );
}
