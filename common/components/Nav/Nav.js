import React from 'react'
import Link from 'next/link'
import styled, { withTheme } from 'styled-components'
import { useTheme, textColor, backgroundColor } from '~/common/theme'
import { ToggleNightModeButton } from '~/common/components'

const links = [
	{ href: 'multiplayer', label: 'Multiplayer Mode' },
	{ href: 'auto', label: 'Auto-Generated Text Mode' },
	{ href: 'custom', label: 'Custom Text Mode' }
]

const Nav = (props) => {
	const themeToggle = useTheme()

	return (
		<NavContainer {...props}>
			<NavLinks>{links.map((link, index) => <NavLink key={index} {...link} />)}</NavLinks>
			<NavItem>
				<ToggleNightModeButton theme={props.theme} themeToggle={themeToggle} />
			</NavItem>
		</NavContainer>
	)
}

const NavLink = ({ href, label }) => (
	<Link href={href}>
		<NavItem>
			<a href={href}>{label}</a>
		</NavItem>
	</Link>
)

const NavLinks = styled.div`
	text-align: center;
	display: flex;
	justify-content: space-around;
	width: 80%;
	padding: 1em 0;
`

const NavItem = styled.div`
	display: inline-block;
	margin: 1em;
	align-self: center;
	a {
		color: ${textColor};
		line-height: 1;
		margin: 0;
		text-decoration: none;
		font-size: 13px;
		padding: 1em 1.6em 0.8em 1.6em;
		text-transform: uppercase;
		letter-spacing: .05em;
		font-weight: 700;
		border-radius: .4em;
		height: 0.5em;
	}
`

const NavContainer = styled.nav`
	margin: 0 auto;
	width: 90%;
	max-width: 1600px;
	display: flex;
	justify-content: space-between;
`

export default withTheme(Nav)
