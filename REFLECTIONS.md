STUDENT NAME : RIZWAN KHAN

Q1 : Who are your users, and what changes for them?
```
The USER is Store Managers, three of them. these are internal and they are using a INVENTORY TRACKER APP for their company to check and ORDER stocks and contact each other. 
This helps keep the inventory in one app rather than them contacting each other to check and collate
in short, one app can be used to manage all three stores inventory.
```

Q2 : Augmented capacity and constrained capacity
```
Augmented : I had a working app in 3 hours which I would have to spend tonnes of company resources and money to get an external company to build. 
Constrained: Some parts of my screen were not my decisions and so I had to send multiple prompts afterwards to make and optimise the changes and make the USER experience relevant. 
```

Q3 : In the loop, on the loop, out of the loop: where was your judgment actually needed?
```
Where your judgment changed the outcome : I rejected some random tabs which were created saying what the screen does, which was already mentioned multiple times. I had to change it.
Where you were nominally in the loop and added nothing : Screen 2, is where the PROMPTS shined and I had to do almost no changes, which was the actual inventory ordering tab.
```

Q4 : What did it build that you never sketched?

```
It decided something you did not know was a decision : The Filters TAB, I did not had to make any changes. because it knew how to filter each model based on different sizes and even added a filter to see all SHOES as compared to each model. I Never thought of this.
It was right where you were wrong. Most of the decisions to create and design the app were spot on. Like each store had a store manger and their name and well.
```

# Q5 : Learning pointers for the organisational context # 
```
1. Set the defaults centrally, because the tool will invent its own if you don't — my app came back calling the three shops "Terminal" instead of "Store" and I only caught it by reading the screen, so give staff a starter template with the org's own naming, data file and no-server settings pre-filled rather than a policy document they read once.
2. Make one named person review the generated code, not just the screen, before anything is shared by link — my first build quietly included a server-side/API scaffold I hadn't asked for and a whole Screen 1 description I never requested, which means "it looks right on my phone" is not evidence that nothing extra shipped.
3. Ban real customer, staff or contact data from prompts and require a scrub step before sharing — I had to prompt separately to mask the last four digits of the store and factory phone numbers, and that only happened because I noticed; nobody would have caught it if the app had been handed on to someone else after I moved team.
