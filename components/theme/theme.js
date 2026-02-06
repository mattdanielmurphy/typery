import { createStyledTheme } from "./createStyledTheme"

const theme = {
	backgroundColor: ["#fff", "#000"], // [ light, dark ]
	textColor: ["#000", "#fff"],
	green: ["#37b948", "#35fc4f"],
	red: ["#e44343", "#ff5f5f"],
	grey: ["rgba(0,0,0,0.05)", "rgba(255,255,255,0.05)"],
	lightGrey: ["rgba(0,0,0,0.05)", "rgba(255,255,255,0.5)"],
	keyDownBackgroundColor: ["rgba(255,255,255,0.6)", "rgba(0,0,0,0.12)"],
	activeKeyBackgroundColor: ["#444", "#ccc"],
	modalBackgroundColor: ["rgba(240, 240, 240, 0.9)", "rgba(5, 5, 5, 0.95)"],
	modalBorder: ["rgba(240, 240, 240, 0.9)", "rgba(0, 0, 0, 0.9)"],
	borderRadius: "0.4em",
	transitionTime: "0.3s",
}

const styledTheme = createStyledTheme(theme)

export const backgroundColor = styledTheme.backgroundColor
export const textColor = styledTheme.textColor
export const green = styledTheme.green
export const red = styledTheme.red
export const grey = styledTheme.grey
export const lightGrey = styledTheme.lightGrey
export const keyDownBackgroundColor = styledTheme.keyDownBackgroundColor
export const activeKeyBackgroundColor = styledTheme.activeKeyBackgroundColor
export const modalBackgroundColor = styledTheme.modalBackgroundColor
export const modalBorder = styledTheme.modalBorder
export const borderRadius = styledTheme.borderRadius
export const transitionTime = styledTheme.transitionTime

export const currentKeyColor = ({ isCurrent, isMissed }) => {
	if (isMissed) return styledTheme.red
	return isCurrent ? styledTheme.green : styledTheme.textColor
}

export default {
	...styledTheme,
	currentKeyColor,
}
