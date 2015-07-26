# Pattern Lab + Gulp + BrowserSync + libsass + SourceMaps

I love [Pattern Lab](patternlab.io/) but I'm also picky about the tools that I work with. I'd rather use Gulp + libsass + BrowserSync than Pattern Lab's Grunt + Compass + LiveReload, so here's a boilerplate, mostly-empty version of a `source/` directory that sets up my preferred tool chain.

The `_patterns/` directory has been cleared out for a fresh starting place. I've left the atoms + molecules + organisms + templates + pages pattern structure in place, however, as atomic design is a [pretty good design methodology](http://patternlab.io/about.html).

## Usage

After [generating Pattern Lab for the first time](http://patternlab.io/docs/first-run.html), delete their stock `source/` directory and replace it with this git repo. Then run the following in your terminal of choice from inside `source/`:

    npm install
    gulp

Running the default `gulp` task sets up a BrowserSync proxy, and you should get a notice about the proxied URL that you can use to view your Pattern Lab (it defaults to `http://localhost:3000/`). Your Sass, JS, and Pattern Lab .mustache files are now being watched for changes.

Add your Sass to the `css/sass/style.scss` file and watch Pattern Lab get your new CSS rules auto-injected! No more waiting for a full PL rebuild.

If you make changes to a pattern's `.mustache` file or add a new pattern template, Gulp will fire off the Pattern Lab build command that regenerates your `public/` directory, and once done BrowserSync will automatically reload your browser. Neat.


