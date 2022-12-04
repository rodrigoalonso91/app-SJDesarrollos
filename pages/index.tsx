import {withPageAuthRequired} from "@auth0/nextjs-auth0"
import Head from "next/head"
import {useEffect} from "react"
import getUser from "../src/GetUser"
import {getNeighborhoods} from "../src/GetNeighborhoods"
import useUserData from "../src/UseUserData"
import styles from "../styles/Home.module.css"
import {useUser} from "@auth0/nextjs-auth0"

export default function Home({neighborhoods}: { neighborhoods: ReadonlyArray<any> }) {
	const user = useUserData()

	useEffect(() => {
		console.log("este log se ejecuta en el browser")
	}, [])

	console.log("este log se ejecuta en el server")

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className={styles.main}>
				<span>{"email: " + user.email}</span>
				<span>{"is admin? " + user.isAdmin}</span>
				<span>{"is auditor? " + user.isAuditor}</span>
				<span>{"is proprietor? " + user.isProprietor}</span>

				<button>CREATE NEW NEIGHBORHOOD</button>

				{neighborhoods.map(neighborhood =>
					<button>{neighborhood.name}</button>
				)}
			</main>
		</div>
	)
}

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async () => {
		const neighborhoods = await getNeighborhoods()
		return {props: {neighborhoods}}
	}
})