import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from "@mantine/core"
import './index.scss'
import App from './app/App'
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <App />
            </MantineProvider>
        </Provider>
    </StrictMode>,
)