// import { BigInt } from "@graphprotocol/graph-ts"
// import {
//   bitdao,
//   Approval,
//   DelegateChanged,
//   DelegateVotesChanged,
//   NewAdmin,
//   NewPendingAdmin,
//   Snapshot,
//   Transfer
// } from "../generated/bitdao/bitdao"
import {
  DelegateChanged as DelegateChangedEvent,
  DelegateVotesChanged as DelegateVotesChangedEvent,
  NewAdmin,
  NewPendingAdmin,
  Snapshot,
  Transfer
} from "../generated/bitdao/bitdao"
import {
  DelegateChanged,
  DelegateVotesChanged,
} from "../generated/schema"

// import { ExampleEntity } from "../generated/schema"

// export function handleApproval(event: Approval): void {
//   // Entities can be loaded from the store using a string ID; this ID
//   // needs to be unique across all entities of the same type
//   let entity = ExampleEntity.load(event.transaction.from.toHex())

//   // Entities only exist after they have been saved to the store;
//   // `null` checks allow to create entities on demand
//   if (entity == null) {
//     entity = new ExampleEntity(event.transaction.from.toHex())

//     // Entity fields can be set using simple assignments
//     entity.count = BigInt.fromI32(0)
//   }

//   // BigInt and BigDecimal math are supported
//   entity.count = entity.count + BigInt.fromI32(1)

//   // Entity fields can be set based on event parameters
//   entity.owner = event.params.owner
//   entity.spender = event.params.spender

//   // Entities can be written to the store with `.save()`
//   entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DELEGATION_TYPEHASH(...)
  // - contract.DOMAIN_TYPEHASH(...)
  // - contract.MAX_SUPPLY(...)
  // - contract.acceptAdmin(...)
  // - contract.admin(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.balanceOfAt(...)
  // - contract.checkpoints(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.delegates(...)
  // - contract.getCurrentVotes(...)
  // - contract.getPriorVotes(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.nonces(...)
  // - contract.numCheckpoints(...)
  // - contract.pendingAdmin(...)
  // - contract.setPendingAdmin(...)
  // - contract.snapshot(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.totalSupplyAt(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
// }

export function handleDelegateChanged(event: DelegateChangedEvent): void {
  let entity = new DelegateChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.delegator = event.params.delegator
  entity.fromDelegate = event.params.fromDelegate
  entity.toDelegate = event.params.toDelegate
  entity.save()
}

export function handleDelegateVotesChanged(event: DelegateVotesChangedEvent): void {
  let entity = new DelegateVotesChanged(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.delegate = event.params.delegate
  entity.previousBalance = event.params.previousBalance
  entity.newBalance = event.params.newBalance
  entity.save()
}

export function handleNewAdmin(event: NewAdmin): void {}

export function handleNewPendingAdmin(event: NewPendingAdmin): void {}

export function handleSnapshot(event: Snapshot): void {}

export function handleTransfer(event: Transfer): void {}
