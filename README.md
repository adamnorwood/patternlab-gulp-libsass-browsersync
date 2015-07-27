# Pattern Lab + Gulp + BrowserSync + libsass + SourceMaps

I love [Pattern Lab](patternlab.io/) but I'm also picky about the tools that I work with. I'd rather use Gulp + libsass + BrowserSync than Pattern Lab's Grunt + Compass + LiveReload, so here's a boilerplate, mostly-empty version of a `source/` directory that sets up my preferred tool chain.

The `_patterns/` directory has been cleared out for a fresh starting place. I've left the atoms + molecules + organisms + templates + pages pattern structure in place, however, as atomic design is a [pretty good design methodology](http://patternlab.io/about.html).

## Usage

After [generating Pattern Lab for the first time](http://patternlab.io/docs/first-run.html), delete the stock `source/` directory and replace it with this git repo. Run the following from inside `source/` to install the additional Gulp plugins:

    npm install

When you're ready to do work, just run `gulp` inside this `source/` directory *instead of* the normal Pattern Lab watch task.

Running this default `gulp` task sets up a BrowserSync proxy, and you should get a notice about the proxied URL that you can use to view your Pattern Lab (it defaults to `http://localhost:3000/`). Your Sass, JS, and Pattern Lab .mustache files are now being watched for changes, you can pull up the site on multiple devices and browsers using the *external* address, etc.

Add your Sass to the `css/sass/style.scss` file and watch Pattern Lab get your new CSS rules auto-injected! No more waiting for a full PL rebuild.

If you make changes to a pattern's `.mustache` file or add a new pattern template, Gulp will fire off the Pattern Lab build command that regenerates your `public/` directory, and once done BrowserSync will automatically reload your browser. Neat.

## Caveats

* This works using the standard PHP build of Pattern Lab — if you use patternlab-node or another fork, you might be able to adjust the `patternLabCommand` variable at the top of `gulpfile.js`
* So far only tested on OS X…
* **Wouldn't it be better to fork Pattern Lab and swap the tools out directly?** Maybe? I leave that as an exercise for the reader!