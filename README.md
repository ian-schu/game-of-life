# Q1 Project Proposal

## Conway's Game of Life

## Project Description

Implement a 2D pixel automaton 'game' in the mold of John Conway's _Game Of Life_ from ca. 1970.

## What problem does your project solve?

Eh well ... the G.O.L was originally devised as a non-meticulous solution to Jon von Neumann's proposal for a definition of life (self-replicating, and can simulate a Turing machine). In that sense, Conway's set of rules eventually allowed for a solution to von Neumann's proposal -- since many patterns are self-propagating, and the simulation allows for construction of Turing 'complete' machines.

So I guess you could say ... the problem we're solving here is the answer to life, the universe, and everything.

Or perhaps more to the point, we are solving the problem of _How to build a simple simulation of life(-like stuff) that can be self-replicating._

## Who has this problem?

^^ Apparently mathematical theorists and experts in cellular automata, among other nerdy demographics.

## How will your project solve this problem?

This implementation of the game will run in the browser, either in an HTML5 canvas element or within a field of individual HTML elements (e.g. divs). The game board will be backed by an abstract model which stores the complete current state of the automata, and state and computation of next-state -- this model / view dichotomy should allow the game to be easily ported to novel view modes. If the need arises :-D

## What inputs does it need?

At minimum, we need users to be able to block-fill pixels on the screen, in roughly the same manner as our earlier Pixel Art Maker exercise. At some point,

## What outputs does it produce?

The board of cell automata must respond to initial user input by way of the 4 'rules' specified by Conway. This progressive 'output' should be observable by querying into the data model or logging it, but the primary output will be visible in the viewport by way of pixels turning black or white.

## What web API(s) will it use?

We won't be using any API calls for this one.

## What technologies do you plan to use?

Most or all of this app will be plain HTML5, CSS, and vanilla JS. It's possible I'll use a utility library such as array2D to help wrangle the board / model as a 2D array ... but I'm not yet sure I'll need such a thing.
**EDIT:** I will definitely be using the **array2D** utility library, as it has a number of functions that will make this project drastically easier and will allow a more "full" implementation of model + view.

#### Technical challenges:

* **Data structure**: it may take some trial and error to figure out how to instantiate an individual cell in the model layer -- will it be good to use OOP here and setup a 'cell' class? We'll have to see.
* **Two-way data binding**: the cell grid VIEW needs to stay synced with the cell grid MODEL, _and_ changes will be initiated from both places.
* **Smart game board edges**: This is listed in _Stage 2_ below -- the goal is to allow automata to wander off the edge of the map and loop back around to reappear on the other side. If I'm using a 'cell' class then I'll need to extend the class for these edge-cells because their computation model will be different.
* **Testing**: If I'm creating a test suite I'll have to think hard about what is worth testing / how I'll run a test. I could run tests solely using the model layer without creating a view, but I'll have to have a clear understanding in advance of what automata should result from what kind of starting patterns.

## Feature list

#### MVP / Stage 0: ✅

**COMPLETE**

✅ User sees **fixed-size game board**, 50x50 cells
✅ User can use mouse clicks to **activate single cells**
✅ User can use **click-and-drag** to activate a string of cells at once
✅ User can advance the simulation forward indefinitely by clicking **Step** button
✅ **¡¡Step function produces behavior consistent with Conway's Four Rules!!**
✅ Game board edges are **dumb** aka cell automata will disappear / die at board edges

#### Stage 1:

* User can "play" simulation continuously by clicking **Play** button
* User can pause simulation by clicking **Stop** button
* User can clear game board and start over by clicking **Reset** button
* **TEST SUITE** started

##### Stage 2:

* Game board edges are **smart** aka if automata wander off the map they will reappear at the other side (technically, this treats the game board as a toroidal projection)
* User can **activate cells during continuous-play mode**
* User can control **step-speed** during continuous-play mode

##### Stage 3:

* At start of game, user is prompted to **enter game board dimensions**, up to some practical limit e.g. 500x500 cells

##### Stage 4 (fun / stretch goals):

* Game board features **color palette** similar to Pixel Art Maker -- non-white **colors are interpolated during simulation** to produce neat visual effects
* User can select from a dropdown of **starting patterns e.g. Glider Guns, Oscillators, etc.**
* App runs properly on **mobile devices**, with responsive layout, and touch input instead of mouse clicks
