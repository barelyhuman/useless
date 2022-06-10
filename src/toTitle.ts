const pascalRegex = /^([A-Z][a-z]+)((?:[A-Z][a-z]+)*)$/
const camelRegex = /^([a-z]+)((?:[A-Z][a-z]+)*)$/

const strToTitle = (x: string) => x[0].toUpperCase() + x.slice(1)
const partsToTitle = (parts: string[]) => {
	const valids = []
	for (const part of parts) {
		if (!part.length) continue

		valids.push(strToTitle(part))
	}
	return valids.join(' ')
}

export default function toTitleCase(toConvert: string) {
	return toConvert
		.split(/[_ -]/g)
		.map(item => {
			if (!item.length) return ''

			// check for camelCase and PascalCase
			const isPascal = pascalRegex.test(item.trim())
			if (isPascal) {
				const parts = item.match(pascalRegex)
				return partsToTitle(parts.slice(1))
			}

			const isCamel = camelRegex.test(item.trim())
			if (isCamel) {
				const parts = item.match(camelRegex)
				return partsToTitle(parts.slice(1))
			}

			return strToTitle(item)
		})
		.join(' ')
}
