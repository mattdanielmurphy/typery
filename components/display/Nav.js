import styled, { withTheme } from "styled-components"

import Link from "next/link"
import React from "react"
import ToggleNightModeButton from "./ToggleNightModeButton"
import { useTheme } from "../theme"

const links = [
	// { href: 'multiplayer', label: 'Multiplayer Mode' },
	// { href: 'auto', label: 'Auto-Generated Text Mode' },
	// { href: 'custom', label: 'Custom Text Mode' }
].map((link) => ({
	...link,
	key: `nav-link-${link.href}-${link.label}`,
}))

const Nav = (props) => {
	const themeToggle = useTheme()

	return (
		<NavContainer {...props}>
			<ul>
				{/* Dark mode is now system-synched */}
				{links.map(({ key, href, label }) => (
					<li key={key}>
						<Link href={href}>
							<a href={href}>{label}</a>
						</Link>
					</li>
				))}
			</ul>
		</NavContainer>
	)
}

const NavContainer = styled.nav`
	text-align: center;
	margin-bottom: 4em;
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
		color: ${(props) => props.theme.textColor};
		text-decoration: none;
		font-size: 13px;
		padding: 1.4em 1.6em 1.4em 1.6em;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 700;
		border-radius: 0.4em;
		background: ${(props) => props.theme.textColor};
	}
`

export default withTheme(Nav)
