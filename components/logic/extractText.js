import JSZip from "jszip"
import { normalizeText } from "./normalizeText"

export const extractTextFromTxt = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = (e) => resolve(normalizeText(e.target.result))
		reader.onerror = (e) => reject(e)
		reader.readAsText(file)
	})
}

export const extractTextFromPdf = async (file) => {
	const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf")
	const version = "2.16.105" // Match installed package version
	pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.legacy.min.js`

	const arrayBuffer = await file.arrayBuffer()
	const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
	const pdf = await loadingTask.promise
	let fullText = ""

	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i)
		const textContent = await page.getTextContent()
		const pageText = textContent.items.map((item) => item.str).join(" ")
		fullText += pageText + "\n"
	}

	return normalizeText(fullText)
}

export const extractTextFromEpub = async (file) => {
	// Simple text extraction from EPUB using JSZip
	const zip = await JSZip.loadAsync(file)
	const htmlFiles = Object.keys(zip.files)
		.filter((name) => name.endsWith(".html") || name.endsWith(".xhtml") || name.endsWith(".htm"))
		.sort()

	let fullText = ""
	for (const fileName of htmlFiles) {
		const content = await zip.files[fileName].async("string")
		const parser = new DOMParser()
		const doc = parser.parseFromString(content, "text/html")
		const scripts = doc.querySelectorAll("script, style, nav, footer")
		scripts.forEach((s) => s.remove())
		fullText += doc.body.innerText + "\n\n"
	}

	return normalizeText(fullText)
}
