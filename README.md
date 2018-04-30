
A highly-interactive rendition of Conway's Game of Life, built as a 1-week independent study project for the first quarter of the Galvanize Web Dev Immersive course.

**Deployed at: http://chromacon.surge.sh**
**Write-up of the project is [here](https://medium.com/@ianschum/chromacon-a-highly-interactive-conways-game-of-life-built-in-javascript-627153f459ec)**:

### Fun features include:
* Color interpolation -- simulates different 'populations' of cells which will intermarry or compete with each other when they collide.
* Playback speed controls -- mix and match with 'cell fade' to create ghostly visual effects
* Collapsible pattern palette -- open from the right side and use the (+) button to open floating pattern dropper

### Deploy history:
**v0** -- basic 'step' function and simple observance of Conway's rules:
http://ian-schu-game-of-life-0.surge.sh/
**v1** -- smart board edges -- automata can wander off the edge of the map and reappear on the other side. Added controls for constant play, stop, and clear:
http://ian-schu-game-of-life-1.surge.sh/
**v2** -- added color interpolation and palette. Added playback speed and cell fade controls:
http://ian-schu-game-of-life-2.surge.sh/
**v3** -- started into stretch goal features such as live population statistics, lots of CSS and layout cleanup, crude windowing system, etc.:
http://ian-schu-game-of-life-3.surge.sh/
**vFinal** -- end of 1-week sprint, added pattern bank, main landing speed, styling and layout fixes, and a ton of refactoring for modularity and code clarity:
http://chromacon.surge.sh

## Dev notes / learning experience
**Written ~8 weeks later**:
This project was built as a self-guided bootcamp project, roughly 2 months after I started learning JavaScript. The goals here did _not_ include optimizing computation of the grid (e.g. hashlife) or rendering a large matrix of cells (e.g. using a `canvas` element). Instead the objective was to simply build a front-end app with a basic concept of MVC decoupling that would allow code reuse, and then use the remaining time in the 1-week sprint to tack on a bunch of 'bonus' stretch goal features.

At the start of the project I had only a vague concept of MVC structure, and could handle the notion of 2-way data binding. It's fun to look back (only a short time later) and see how much more could have been done.

If I could do it again, I would set up 1-way data binding, with event-based updates to the view nodes instead of using dirty checking for each frame. For that matter, it would run _much_ faster if rendered in an HTML `canvas` rather than a grid of `span` elements. Also, I would take at least rudimentary(!) steps to keep the global namespace clear.
