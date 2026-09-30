import {Outlet} from 'react-router';
import {Header} from './components/Header/Header';

export function Layout() {
    return (
        <>
            <Header />

            <main>
                <Outlet />
            </main>
        </>
    );
}