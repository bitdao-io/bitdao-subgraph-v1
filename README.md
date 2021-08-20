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


```
type TokenHolder @entity {
  "Address of this TokenHolder"
  id: ID!

  "Delegate entity that this TokenHolder has delegated their vote weight to"
  delegate: Delegate
  
  "Number of tokens this TokenHolder has"
  tokenBalance: BigDecimal!
}

type Delegate @entity {
  "Address of this Delegate"
  id: ID!

  "Number of votes (token weights) delegated to this Delegate"
  delegatedVotes: BigDecimal!

  "Number of TokenHolders that have delegated their votes (token weights) to this Delegate"
  numDelegators: Int!

  "List of this Delegate's represented TokenHolders"
  Delegators: [TokenHolder!]! @derivedFrom(field: "delegate")
}
```

8. then in terminal run-> `graph codegen && graph build`
9. `graph auth --studio` (enter the deploy key when prompted)

10. `graph deploy --studio <name of the graph>` (enter the version when prompted)
