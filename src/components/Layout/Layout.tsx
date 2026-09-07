import {Container, Title} from "@mantine/core";
import Header from "@/components/Header/Header";
import ProductList from "@/components/ProductList/ProductList";

const Layout = () => {
    return (
        <>
            <Header/>
            <Container size="1280">
                <Title
                    order={1}
                    style={{
                        textAlign: "left",
                        color: "#000000",
                        marginBottom: "49px",
                        marginTop: "60px",
                        fontWeight: 600
                    }}
                >Catalog</Title>
                <ProductList/>
            </Container>
        </>
    );
};

export default Layout;