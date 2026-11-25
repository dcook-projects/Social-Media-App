import { StrictMode, type ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext.tsx";
import { render, type RenderOptions } from "@testing-library/react";

function makeQueryClient() {
    return (
        new QueryClient({
            defaultOptions: {
                //prevent retries in order to save time
                queries: { retry: false},
                mutations: { retry: false },
            },
        })
    );
}

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<StrictMode>
			<MemoryRouter>
				<QueryClientProvider client={makeQueryClient()}>
					<AuthProvider>{children}</AuthProvider>
				</QueryClientProvider>
			</MemoryRouter>
		</StrictMode>
	);
};

/*
 * This is a helper function to prevent the need to pass all providers to every
 * single test 
 */
export const renderWithProviders = (
    ui: ReactElement,  // the component being tested
    options?: Omit<RenderOptions, "wrapper">, // RTL render options
    
    // calls the render() functions and specifies the providers as a wrapper
) => render(ui, { wrapper: AllProviders, ...options });