// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class TokenHolder extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenHolder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenHolder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenHolder", id.toString(), this);
  }

  static load(id: string): TokenHolder | null {
    return store.get("TokenHolder", id) as TokenHolder | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string | null {
    let value = this.get("delegate");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set delegate(value: string | null) {
    if (value === null) {
      this.unset("delegate");
    } else {
      this.set("delegate", Value.fromString(value as string));
    }
  }

  get tokenBalance(): BigDecimal {
    let value = this.get("tokenBalance");
    return value.toBigDecimal();
  }

  set tokenBalance(value: BigDecimal) {
    this.set("tokenBalance", Value.fromBigDecimal(value));
  }
}

export class Delegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Delegate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Delegate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Delegate", id.toString(), this);
  }

  static load(id: string): Delegate | null {
    return store.get("Delegate", id) as Delegate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegatedVotes(): BigDecimal {
    let value = this.get("delegatedVotes");
    return value.toBigDecimal();
  }

  set delegatedVotes(value: BigDecimal) {
    this.set("delegatedVotes", Value.fromBigDecimal(value));
  }

  get numDelegators(): i32 {
    let value = this.get("numDelegators");
    return value.toI32();
  }

  set numDelegators(value: i32) {
    this.set("numDelegators", Value.fromI32(value));
  }

  get Delegators(): Array<string> {
    let value = this.get("Delegators");
    return value.toStringArray();
  }

  set Delegators(value: Array<string>) {
    this.set("Delegators", Value.fromStringArray(value));
  }
}
