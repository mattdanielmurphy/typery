import React from 'react'
import Link from 'next/link'
import styled, { withTheme } from 'styled-components'
import { useTheme } from '../components/ThemeContext'
import ToggleNightModeButton from '../components/ToggleNightModeButton'

const links = [
	{ href: 'multiplayer', label: 'Multiplayer Mode' },
	{ href: 'auto', label: 'Auto-Generated Text Mode' },
	{ href: 'custom', label: 'Custom Text Mode' }
].map((link) => ({
	...link,
	key: `nav-link-${link.href}-${link.label}`
}))

const Nav = (props) => {
	const themeToggle = useTheme()

	return (
		<NavContainer {...props}>
			<ul>
				<li>
					<ToggleNightModeButton theme={props.theme} themeToggle={themeToggle} />
				</li>
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
const UnstyledNavContainer = (props) => <nav {...props} />

const NavContainer = styled(UnstyledNavContainer)`
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
		letter-spacing: .05em;
		font-weight: 700;
		border-radius: .4em;
		background: ${(props) => props.theme.textColor};
	}
`

export default withTheme(Nav)
