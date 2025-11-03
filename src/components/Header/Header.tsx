import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { Link, useLocation} from 'react-router-dom';
import HumanIcon from "../../assets/human.svg"
import HHIcon from "../../assets/HHunter.png"
//Logo - намеренно в png, svg не хочет билдиться, ни напрямую ни через импорт
export const Header = () => {
    const theme = useMantineTheme();

    const location = useLocation();
    const isCurrent = location.pathname === '/vacancies';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isCurrent) e.preventDefault();
    };

    return (
        <Box    
            component="header"
            data-testid="header"
            style={{
                width: "100%",
                padding: "14px 20px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 2px 22.5px 0px #1C1D1F0D",
            }}
        >
            <Group justify="space-between" align="center" maw={828}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={handleClick}>
                    <Group align="center" gap="xs">
                        <img src={HHIcon} alt="HH" data-testid="logo-hh"/>
                        <Text fw={600} data-testid="header-title">.FrontEnd</Text>
                    </Group>
                </Link>

                <Group gap={24}>
                    <Link to="/vacancies" style={{ textDecoration: 'none', color: 'inherit' }}   onClick={handleClick}>

                        <Group align="center" gap={8}>
                            <Text
                                data-testid="vacancies-text"
                                fw={500}
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                Вакансии FE
                            </Text>
                            <Box
                                data-testid="vacancies-marker"
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: "#4263EB",
                                }}
                            />
                        </Group>
                    </Link>

                    <Link to="/aboutme" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Group align="center" gap={6} style={{ cursor: "pointer" }}>
                            <img src={HumanIcon} alt="human" data-testid="human-icon"/>
                            <Text fw={500} c={theme.other.colors.gray} data-testid="about-text">
                                Обо мне
                            </Text>
                        </Group>
                    </Link>
                </Group>
            </Group>
        </Box>
    );
};
