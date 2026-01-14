module.exports = function(eleventyConfig) {
  // ===========================================
  // SHORTCODES
  // ===========================================
  
  // Get post URL by title
  eleventyConfig.addShortcode("postUrl", function(title) {
    // Access collections via this.ctx (standard 11ty way)
    // Note: 'this' is available because we use a regular function, not an arrow function
    const posts = (this.ctx && this.ctx.collections && this.ctx.collections.posts) || [];
    const post = posts.find(p => p.data.title === title);
    return post ? post.url : "#";
  });
};