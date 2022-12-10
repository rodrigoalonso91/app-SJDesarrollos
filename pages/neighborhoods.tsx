import {withPageAuthRequired} from "@auth0/nextjs-auth0"
import Head from "next/head"
import {useEffect} from "react"
import getUser from "../src/GetUser"
import {getNeighborhoods} from "../src/GetNeighborhoods"
import styles from "../styles/Home.module.css"
import {useUser} from "@auth0/nextjs-auth0"
import { Navbar } from "./components"

export default function Home({neighborhoods}: { neighborhoods: ReadonlyArray<any> }) {
	
	const {user} = useUser()

	useEffect(() => {
		console.log(user)
	}, [])

	return (
		<>
			<Navbar nickname={user?.nickname} />
			<h1>Barrios</h1>
			<div>{user?.email || "fome"}</div>
		</>
	)

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon" href="/favicon.ico"/>
			</Head>

			<main className={styles.main}>
				<button>CREATE NEW NEIGHBORHOOD</button>

				{neighborhoods.map(({id, name}) =>
					<button key={id}>{name}</button>
				)}
			</main>
		</div>
	)
}

//withPageAuthRequired({
//	getServerSideProps: async function getServerSideProps({req, res}: any) {
//		const user = await getUser({req, res})
//		if (!user.isLoggedIn) return {redirect: {permanent: false, destination: "/unauthorized"}}
//
//		console.log(1)
//		const neighborhoods = await getNeighborhoods()
//		console.log(neighborhoods)
//		console.log(2)
//
//		return {props: {neighborhoods, user}}
//	}
//})

export const getServerSideProps = withPageAuthRequired({
	getServerSideProps: async function getServerSideProps({req, res}: any) {
		const user = await getUser({req, res})
		if (!user.isLoggedIn) return {redirect: {permanent: false, destination: "/unauthorized"}}
		return {props: {user}}
	}
})