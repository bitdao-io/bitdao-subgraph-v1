# BitDAO V1 Subgraph

1. go to https://thegraph.com/
2. signup/login with your metamask account
3. there will be a dropdown icon on top right corner beside your address. click on it and click on subgraphs. it will redirect you to new page and click on create Subgraph button
4. it will ask to enter name of your subgraph
5. it will redirect you to new page
6. then have to run few commands
`npm install -g @graphprotocol/graph-cli ( they can also do yarn add )`
`graph init --contract-name <name of token contract> --index-events --product subgraph-studio --from-contract <contract address>`
after running the above command it show some options and choose them according
7. then go into your subgraph dir and open the file schema.graphql and update it with below code

```typescript
type DelegateChanged @entity {
  id: ID!
  delegator: Bytes! # address
  fromDelegate: Bytes! # address
  toDelegate: Bytes! # address
}
type DelegateVotesChanged @entity {
  id: ID!
  delegate: Bytes! # address
  previousBalance: BigInt! # uint256
  newBalance: BigInt! # uint256
}
```

8. then in terminal run-> `graph codegen && graph build`
9. `graph auth --studio` (enter the deploy key when prompted)

10. `graph deploy --studio <name of the graph>` (enter the version when prompted)