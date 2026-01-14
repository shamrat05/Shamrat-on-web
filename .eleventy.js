const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // ===========================================
  // MODULAR CONFIGURATION
  // ===========================================
  
  // Load configuration modules
  require('./config/filters')(eleventyConfig);
  require('./config/collections')(eleventyConfig);
  require('./config/shortcodes')(eleventyConfig);

  // ===========================================
  // PASSTHROUGH COPY
  // ===========================================
  
  // Copy all assets directly (CSS, JS, Images)
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/content");
  
  // Copy any other static files
  eleventyConfig.addPassthroughCopy({ "./src/robots.txt": "/robots.txt" });

  // ===========================================
  // CONFIGURATION
  // ===========================================
  
  console.log('🔧 Eleventy Configuration Loaded (Modular)');
  console.log('📁 Input directory:', eleventyConfig.dir?.input || 'src');
  
  const config = {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk", 
    dataTemplateEngine: "njk",
    // Ensure proper path resolution for Vercel
    pathPrefix: "/",
  };

  // Eleventy Dev Server Config (Simulate Vercel Rewrites locally)
  eleventyConfig.setServerOptions({
    middleware: [
      function (req, res, next) {
        const url = new URL(req.url, "http://localhost");
        const rewriteRoutes = [
          "/about",
          "/experience",
          "/skills",
          "/featured-projects",
          "/contact"
        ];
        
        if (rewriteRoutes.includes(url.pathname)) {
          // rewrite to index.html
          req.url = "/";
        }
        next();
      }
    ]
  });
  
  return config;
};