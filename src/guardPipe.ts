type Operation = (data?: any) => Promise<boolean>

const DIGEST = 'DIGEST_GUARD_ERROR'

async function createGuardPipe(...args: Operation[]) {
	const ctx = this || {}
	const results: Record<string, boolean> = {}
	try {
		await args.reduce((chain, operation: Operation) => {
			return chain
				.then((prevData?: any) => {
					// take in the previous data and pass it down
					return operation(prevData)
				})
				.then(opData => {
					// return to the next possible operation
					results[operation.name] = opData
					if (!opData && ctx.breakOnFalse) {
						// no error message as this will be digested
						throw new Error(DIGEST)
					}
					return results
				})
		}, Promise.resolve())
		return results
	} catch (err) {
		if (err.message === DIGEST) return results
		throw err
	}
}

/**
 *
 * **Note:** Unlike other utils, this util exports 2 functions, read each example to understand
 * the usage.
 *
 *
 * Simple pipe styled utility tailored to write structured guards.
 *
 * You can simply write `const isLoggedIn = await getUser()` and write checks based on each
 * function and that should scale just fine in most cases.
 *
 * This to maintain a structure or a train of checks that can be both isolated or dependent
 * on the previous check.
 *
 * `guardPipe` is a fail fast pipe which will not trigger any other pipe function
 * if one of them returns false.
 * This allows you to write checks without having to (in most cases) add a conditional check
 * on the properties , (see example below)
 *
 *
 *
 * #### Example
 * ```ts
 * import { guardPipe } from "@barelyhuman/useless/guardPipe";
 *
 * const user = {
 *   id: 1,
 *   email: null,
 * };
 *
 * async function guards() {
 *   const steps = await guardPipe(
 *     async function isLoggedIn() {
 *       return user ? true : false;
 *     },
 *     async function isProfileComplete() {
 *       return user.email ? true : false;
 *     },
 *     async function isPaymentInfoComplete() {
 *       return user.payment.customerId ? true : false;
 *     }
 *   );
 *
 *   if (!steps.isLoggedIn) {
 *     navigate("Login");
 *   }
 *
 *   if (!steps.isProfileComplete) {
 *     navigate("UpdateProfile");
 *   }
 * }
 * ```
 */
export const guardPipe: typeof createGuardPipe = createGuardPipe.bind({
	breakOnFalse: true,
})

/**
 **Note:** Unlike other utils, this util exports 2 functions, read each example to understand
 * the usage.
 *
 *
 * Simple pipe styled utility tailored to write structured guards.
 *
 * `guardPipeLoose` is a straightforward pipe which will continue down the pipes no matter the
 * result.
 * when using this, you'll have to make sure you write conditional checks for
 * each dependent property that you use.
 *
 * #### Example
 * ```ts
 * import { guardPipeLoose } from "@barelyhuman/useless/guardPipe";
 *
 * const user = {
 *   id: 1,
 *   email: null,
 * };
 *
 * async function guards() {
 *   const steps = await guardPipeLoose(
 *     async function isLoggedIn() {
 *       return user ? true : false;
 *     },
 *     async function isProfileComplete() {
 *       return user?.email ? true : false;
 *     },
 *     async function isPaymentInfoComplete() {
 *       return user.payment?.customerId ? true : false;
 *     }
 *   );
 *
 *   if (!steps.isLoggedIn) {
 *     navigate("Login");
 *   }
 *
 *   if (!steps.isProfileComplete) {
 *     navigate("UpdateProfile", { userId: 1 });
 *   }
 * }
 * ```
 */
export const guardPipeLoose: typeof createGuardPipe = createGuardPipe.bind({
	breakOnFalse: false,
})
