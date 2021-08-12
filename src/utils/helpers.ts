import {
    TokenHolder,
    Delegate,
} from "../../generated/schema";


import {
    BigDecimal,
    BigInt
} from "@graphprotocol/graph-ts";


/* CONSTANTS */

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const TOKEN_DECIMALS = 18
export let BIGINT_ZERO = BigInt.fromI32(0);
export let BIGINT_ONE = BigInt.fromI32(1);
export let BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);


/* CREATING ENTITIES */

export function getOrCreateTokenHolder(
    id: String,
    exists: boolean = false,
    save: boolean = true
): TokenHolder {

    // Retrieve TokenHolder entity
    let tokenHolder = TokenHolder.load(id);

    if (tokenHolder == null && !exists) {
        // if TokenHolder with address id was not previously indexed, create new entity
        tokenHolder = new TokenHolder(id);
        tokenHolder.tokenBalance = BIGDECIMAL_ZERO;

        if (save) {
            tokenHolder.save();
        }
    }

    return tokenHolder as TokenHolder;
}

export function getOrCreateDelegate(
    id: String,
    exists: boolean = false,
    save: boolean = true
): Delegate {

    // Retrieve Delegate entity
    let delegate = Delegate.load(id);

    if (delegate == null && !exists) {
        delegate = new Delegate(id);
        // if TokenHolder with address id was not previously indexed, create new entity
        delegate.delegatedVotes = BIGDECIMAL_ZERO;
        delegate.numDelegators = 0;

        if (save) {
            delegate.save();
        }
    }

    return delegate as Delegate;
}

/* DECIMAL CONVERSION */

export function pow(base: BigDecimal, exponent: number): BigDecimal {
    let result = base

    if (exponent == 0) {
        return BigDecimal.fromString('1')
    }

    for (let i = 2; i <= exponent; i++) {
        result = result.times(base)
    }

    return result
}

export function toDecimal(value: BigInt, decimals: number = TOKEN_DECIMALS): BigDecimal {
    let precision = BigInt.fromI32(10)
        .pow(<u8>decimals)
        .toBigDecimal()

    return value.divDecimal(precision)
}