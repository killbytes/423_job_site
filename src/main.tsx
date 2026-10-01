import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core"
import './index.scss'
import App from './App'
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Provider } from "react-redux";
import { store } from "./store";
import {BrowserRouter} from 'react-router';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/423_job_site">
            <Provider store={store}>
                <MantineProvider>
                    <App />
                </MantineProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)