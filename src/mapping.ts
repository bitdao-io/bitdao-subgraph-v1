import { log } from "@graphprotocol/graph-ts"
import {
  BitDAO,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  NewAdmin,
  NewPendingAdmin,
  Snapshot,
  Transfer
} from "../generated/BitDAO/BitDAO"

import {
  getOrCreateTokenHolder,
  getOrCreateDelegate,
  toDecimal,
  ZERO_ADDRESS,
  BIGDECIMAL_ZERO,
} from "./utils/helpers";


export function handleDelegateChanged(event: DelegateChanged): void {
  let tokenHolder = getOrCreateTokenHolder(
    event.params.delegator.toHexString()
  );

  let oldDelegate = getOrCreateDelegate(
    event.params.fromDelegate.toHexString()
  );

  let newDelegate = getOrCreateDelegate(event.params.toDelegate.toHexString());

  tokenHolder.delegate = newDelegate.id;
  tokenHolder.save();

  if (oldDelegate.id != newDelegate.id) {
    oldDelegate.numDelegators =
      oldDelegate.numDelegators - 1;
    newDelegate.numDelegators =
      newDelegate.numDelegators + 1;

    oldDelegate.save();
    newDelegate.save();
  }

}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let delegate = getOrCreateDelegate(event.params.delegate.toHexString());
  delegate.delegatedVotes = toDecimal(event.params.newBalance);
  delegate.save();
}

export function handleTransfer(event: Transfer): void {
  let fromHolder = getOrCreateTokenHolder(event.params.from.toHexString());
  let toHolder = getOrCreateTokenHolder(event.params.to.toHexString());;

  // fromHolder
  if (event.params.from.toHexString() != ZERO_ADDRESS) {
    let fromHolderPreviousBalance = fromHolder.tokenBalance;
    fromHolder.tokenBalance =
      fromHolder.tokenBalance.minus(toDecimal(event.params.value));

    if (fromHolder.tokenBalance < BIGDECIMAL_ZERO) {
      log.error("Negative balance on holder {} with balance {}", [
        fromHolder.id,
        fromHolder.tokenBalance.toString()
      ]);
    }

    fromHolder.save();
  }

  // toHolder
  let toHolderPreviousBalance = toHolder.tokenBalance;
  toHolder.tokenBalance = toHolder.tokenBalance.plus(toDecimal(event.params.value));

  toHolder.save();
}

export function handleNewAdmin(event: NewAdmin): void { }

export function handleApproval(event: Approval): void { }

export function handleNewPendingAdmin(event: NewPendingAdmin): void { }

export function handleSnapshot(event: Snapshot): void { }
