import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'

const Home = () => (
	<div>
		<Head>
			<title>Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<div className="hero">
			<h1 className="title">Welcome to Untitled Typing App</h1>
			<p className="description">
				Improving your typing efficiently the way <em>you</em> want.
			</p>

			<div className="row">
				<Link href="#">
					<a className="card">
						<h3>Multiplayer</h3>
						<p>Race against another person.</p>
					</a>
				</Link>
				<Link href="auto">
					<a className="card">
						<h3>Auto-Generated Text Mode</h3>
						<p>
							Learn to type by typing word fragments automatically generated based on your weakest letter.
						</p>
					</a>
				</Link>
				<Link href="#">
					<a className="card">
						<h3>Custom Text Mode</h3>
						<p>Type your favorite book, poem, essay, whatever--I don't care!</p>
					</a>
				</Link>
			</div>
		</div>
	</div>
)

export default Home
