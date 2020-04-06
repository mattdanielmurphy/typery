import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const links = [
	{ href: 'multiplayer', label: 'Multiplayer Mode' },
	{ href: 'auto', label: 'Auto-Generated Text Mode' },
	{ href: 'custom', label: 'Custom Text Mode' }
].map((link) => ({
	...link,
	key: `nav-link-${link.href}-${link.label}`
}))

const Nav = () => (
	<nav>
		<ul>
			{links.map(({ key, href, label }) => (
				<li key={key}>
					<Link href={href}>
						<a href={href}>{label}</a>
					</Link>
				</li>
			))}
		</ul>

		<style jsx>{`
			:global(body) {
				margin: 0;
				font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
			}
			nav {
				text-align: center;
			}
			ul {
				display: flex;
				justify-content: space-between;
			}
			nav > ul {
				padding: 4px 16px;
			}
			li {
				display: flex;
				padding: 6px 8px;
			}
			a {
				color: black;
				text-decoration: none;
				font-size: 13px;
				font-family: monospace;
				padding: .5em .7em .3em .7em;
				border-radius: .4em;
			}
		`}</style>
	</nav>
)

export default Nav
