import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import '../styles/sass/style.scss'

const Home = () => (
	<div>
		<Head>
			<title>Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Nav />

		<div className="hero">
			<h1 className="title">Welcome to Untitled Typing App</h1>
			<p className="description">
				Improving your typing efficiently the way <em>you</em> want.
			</p>

			<div className="row">
				<Link href="https://nextjs.org/docs">
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
				<Link href="https://github.com/zeit/next.js/tree/master/examples">
					<a className="card">
						<h3>Custom Text Mode</h3>
						<p>Type your favorite book, poem, essay, whatever--I don't care!</p>
					</a>
				</Link>
			</div>
		</div>

		<style jsx>{`
			.hero {
				width: 100%;
				color: #333;
			}
			.title {
				margin: 0;
				width: 100%;
				padding-top: 80px;
				line-height: 1.15;
				font-size: 48px;
			}
			.title,
			.description {
				text-align: center;
			}
			.row {
				max-width: 740px;
				margin: 80px auto 40px;
				display: flex;
				flex-direction: row;
				justify-content: space-evenly;
			}
			.card {
				padding: 18px 18px 24px;
				width: 220px;
				text-align: left;
				text-decoration: none;
				color: #434343;
				background: #f9f9f9;
			}
			.card:hover {
				border-color: #067df7;
			}
			.card h3 {
				margin: 0;
				color: #067df7;
				font-size: 18px;
			}
			.card p {
				margin: 0;
				padding: 12px 0 0;
				font-size: 13px;
				color: #333;
			}
		`}</style>
	</div>
)

export default Home
