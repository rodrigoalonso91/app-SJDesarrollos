import "../styles/globals.css"
import { UserProvider } from "@auth0/nextjs-auth0"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { store } from "@web/store/store"
import { Navbar } from "@web/components"
import { NeighborhoodGridDataProvider } from "src/context/NeighborhoodGridContext"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<NeighborhoodGridDataProvider>
				<Provider store={store}>
					<Navbar />
					<Component {...pageProps} />
				</Provider>
			</NeighborhoodGridDataProvider>
		</UserProvider>
	)
}