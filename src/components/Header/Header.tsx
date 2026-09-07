import {Group, Badge} from "@mantine/core";
import Cart from "@/components/Cart/Cart";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Group gap="xs"
                       style={{
                           background: "#F7F7F7",
                           borderRadius: "16px",
                           padding: "0px 0px 0px 8px"
                       }}
                >
                    <h2 className={styles.logo}>Vegetable</h2>
                    <Badge
                        color="green"
                        radius="xl"
                        variant="filled"
                    >
                        SHOP
                    </Badge>
                </Group>
                <Cart/>
            </div>
        </header>
    );
};

export default Header;