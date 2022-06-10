/**
 * It does what it says, find links from the given text, and returns an array of items
 * with and without the links, this can then be used to construct custom rendered elements
 *
 *
 * @module
 */

export interface LinkMatch {
	isLink: boolean
	value: string
}

const matcher = (text: string) => {
	const linkRegex =
		/(https?:\/\/)?(www\.)?[-\w@:%.+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-\w()@:%+.~#?&/=]*)/g
	return String(text).matchAll(linkRegex)
}

export default function findLinks(textToParse: string): LinkMatch[] {
	const linksIterator = matcher(textToParse)
	const classifiedMatches: LinkMatch[] = []

	let slicedTillIndex = 0

	for (const linkItem of linksIterator) {
		if (linkItem.length === 0) continue

		if (!linkItem[0]) continue

		let endIndex
		if (typeof linkItem.index !== 'undefined')
			endIndex = linkItem.index + linkItem[0].length

		const currentSlice = {
			link: linkItem[0],
			index: linkItem.index,
			endIndex,
		}

		const prefix = textToParse.slice(slicedTillIndex, currentSlice.index)
		let linkText

		textToParse.slice(slicedTillIndex, currentSlice.index)

		if (currentSlice.endIndex)
			linkText = textToParse.slice(currentSlice.index, currentSlice.endIndex)

		if (prefix) {
			classifiedMatches.push({
				value: prefix,
				isLink: false,
			})
		}

		if (linkText) {
			classifiedMatches.push({
				value: linkText,
				isLink: true,
			})
		}

		slicedTillIndex = currentSlice.endIndex || slicedTillIndex
	}

	const remainingText = textToParse.slice(slicedTillIndex)

	if (remainingText) {
		classifiedMatches.push({
			value: remainingText,
			isLink: false,
		})
	}

	return classifiedMatches
}
