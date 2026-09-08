# PROMPTS.md - [Product name : CloudShoeCO.]

**Student:** [RIZWAN KHAN] · **Course:** MGMT 6110 · **Problem Set 1**

**User sentence:** A [Store Manager] opens this screen to [check the inventory based on two models of CLOUDShoeCo., namely CloudWALK and CloudRUN also in three different sizes US 8, US 10, US 12, and see the ones which are running low (less than 5 pairs and need to be reordered)], and knows it worked when [a check mark can be selected, which shows on the side as status – Ordered.].

**Live link:** [https://cloudshoeco.vercel.app]

---

## Prompt 1 - the master prompt
```
ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of [CLOUDShoeCo. Inv. Checker], a web product for [Users : Store Managers, in Bugis, Jewel and Takashimaya, three of them]. Their job on this product is [See available stocks, if the stocks are more that 5 units they are green colored tabs and if less than 5 it is yellow tab and if its zero it is in red colored tab, corresponding to each tab it shows a checkbox with a option to tick mark for placing order].

Screens: 1) [SCREEN 1: It shows the two kinds of shoes we have, CloudWALK and CloudRUN, and the user can click on its photo to show product category, which is LifeStyle and Walking for CloudWALK and Running and Sports for CloudRUN ] 2) [SCREEN 2, See available stocks, if the stocks are more that 5 units they are green colored tabs and if less than 5 it is yellow tab and if its zero it is in red colored tab, corresponding to each tab it shows a checkbox with a option to tick mark for placing order]

OUTPUT: A running app. Keep every invented value in ONE data file of its own, with at least 3 rows, so the screen looks real. One component per screen or section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any other model. Do NOT call any outside service or fetch from any URL. No database,no login, no user accounts, no analytics. No features I did not list. No real company's name, logo, or trademark. Invented names and numbers only, nothing confidential.

CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 3. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it. 

```
**What came back:** A running app, 2 screens, with filters named Terminal instead of Store for the three location I had added . It added a screen 1 description as well which I never asked.

**What I changed next and why:** changed the terminal naming for locations to STORE, had not specified in the prompt.

---

## Prompt 2 - 
```
the 'terminal' name for three location needs to be renamed to STORE
```
**What came back:** Correct, one file touched.
**What I changed next and why:** redundant tab originally appeared showing product showcase.changed it to company mission to look better.

## Prompt 3 - 
```
the screen 1 tab showing Product Showcase, changes to Company Description which is, what Cloud Shoe Co. is in just one or two lines and also company Mission. change nothing else
```
**What came back:** Correct, one file touched.
**What I changed next and why:** updated to optimise look and info for USER

## Prompt 4 - 
```
In the same Company tab, change the description to a tagline. change nothing else.
```
**What came back:** Correct, one file touched.
**What I changed next and why:** Nothing. updated to optimise look and info for USER.

## Prompt 5 - 
```
On screen 1, inside the two model lines, remove the category hidden tab. change nothing else.
```
**What came back:** Correct, one file touched.
**What I changed next and why:** updated to optimise look and info for USER.

## Prompt 6 - 
```
add a tab in screen 1 at the bottom showing Operational Update. Scheduled Maintenance for a specific day and time. and contact for each store and factory. change nothing else.
```
**What came back:** Correct, one file touched.
**What I changed next and why:** updated to optimise look and info for USER.


## Prompt 6 - 
```
in screen one remove the heading tab "operational update'. also for all of the contacts the last four numbers becomes xxxx. change nothing else.
```
**What came back:** Correct, one file touched.
**What I changed next and why:** updated to optimise look and info for USER and anonymise phone numbers.







---

## Prompt 3 - [and so on, one entry per prompt, in order]
