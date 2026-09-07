import { render, type RenderOptions } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import type { ReactElement, ReactNode } from "react";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import {rootReducer, type RootState} from "@/store";

type AppStore = ReturnType<typeof setupStore>;

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

type ExtendedRenderOptions = Omit<RenderOptions, "wrapper"> & {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
};

export function renderWithProviders(
    ui: ReactElement,
    {
        preloadedState,
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({children}: { children: ReactNode; }) {
        return (
            <MantineProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </MantineProvider>
        );
    }

    return {
        store,
        ...render(ui, {
            wrapper: Wrapper,
            ...renderOptions,
        }),
    };
}