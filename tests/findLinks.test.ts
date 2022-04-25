import {test} from 'uvu'
import * as assert from 'uvu/assert'
import findLinks from '../src/findLinks'

const TEXTS = {
	WITH_LINKS:
		"Lorem Ipsum is https://github.com/barelyhuman of the https://google.com/ industry. Lorem https://dev.to industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
	NO_LINKS:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
	ONLY_LINK: 'https://github.com/barelyhuman',
	ONLY_LINK2: 'https://www.youtube.com/watch?v=w66Jn6W58wE',
}

test('linked text', () => {
	const parsed = findLinks(TEXTS.WITH_LINKS)
	const links = []
	const text = []
	for (const item of parsed) {
		if (item.isLink) {
			links.push(item)
		} else {
			text.push(item)
		}
	}

	assert.is(text.length, 4)
	assert.is(links.length, 3)
})

test('unlinked text', () => {
	const parsed = findLinks(TEXTS.NO_LINKS)
	const links = []
	const text = []

	for (const item of parsed) {
		if (item.isLink) {
			links.push(item)
		} else {
			text.push(item)
		}
	}

	assert.is(text.length, 1)
	assert.is(links.length, 0)
})

test('only link', () => {
	const parsed = findLinks(TEXTS.ONLY_LINK)
	const parsedTwo = findLinks(TEXTS.ONLY_LINK2)
	const links = []
	const text = []

	for (const item of parsed) {
		if (item.isLink) {
			links.push(item)
		} else {
			text.push(item)
		}
	}

	for (const item of parsedTwo) {
		if (item.isLink) {
			links.push(item)
		} else {
			text.push(item)
		}
	}

	assert.is(text.length, 0)
	assert.is(links.length, 2)
})

test.run()
