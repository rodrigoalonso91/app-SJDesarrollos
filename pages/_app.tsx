import "../styles/globals.css"
import {UserProvider} from "@auth0/nextjs-auth0"
import type {AppProps} from "next/app"
import { Provider } from "react-redux"
import { store } from "./../src/store/store"

export default function App({Component, pageProps}: AppProps) {
	return (
		<UserProvider>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</UserProvider>
	)
}
