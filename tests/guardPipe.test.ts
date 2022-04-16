import {test} from 'uvu'
import * as assert from 'uvu/assert'
import {guardPipe, guardPipeLoose} from '../src/guardPipe'

const mockData = {
	user: {
		id: 1,
		email: null,
		payment: {
			customerId: null,
		},
	},
}

test('should return at first false', async () => {
	const perms = await guardPipe(
		async function isLoggedIn() {
			return mockData.user?.id ? true : false
		},
		async function isProfileComplete() {
			return mockData.user.email ? true : false
		},
		async function isPaymentComplete() {
			return mockData.user.payment.customerId ? true : false
		},
	)

	// should be false
	assert.not.ok(perms.isProfileComplete)
	assert.type(perms.isProfileComplete, 'boolean')

	// last property shouldn't exist
	assert.not.ok(Object.hasOwnProperty.call(perms, 'isPaymentComplete'))
})

test('should keep going till end', async () => {
	const perms = await guardPipeLoose(
		async function isLoggedIn() {
			return mockData.user?.id ? true : false
		},
		async function isProfileComplete() {
			return mockData.user?.email ? true : false
		},
		async function isPaymentComplete() {
			return mockData.user?.payment?.customerId ? true : false
		},
	)

	// should be false
	assert.not.ok(perms.isProfileComplete)
	assert.type(perms.isProfileComplete, 'boolean')

	// should be false
	assert.not.ok(perms.isPaymentComplete)
	assert.type(perms.isPaymentComplete, 'boolean')
})

test.run()
