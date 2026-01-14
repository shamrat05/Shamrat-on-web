module.exports = function(eleventyConfig) {
  // ===========================================
  // COLLECTIONS
  // ===========================================
  
  // Blog posts collection - sorted by date (newest first) - only published posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .filter(post => post.data.published !== false) // Include only published posts
      .sort((a, b) => {
        return b.date - a.date; // Newest first
      });
  });
  
  // Ensure markdown files in subdirectories generate individual pages
  eleventyConfig.addCollection("blogPages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .filter(post => post.data.published !== false);
  });
  
  // Latest posts (for homepage preview) - only published posts
  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .filter(post => post.data.published !== false) // Include only published posts
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  // ===========================================
  // PORTFOLIO COLLECTIONS
  // ===========================================

  // Portfolio collection
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    const items = collectionApi.getFilteredByGlob("src/content/portfolio/*.md")
      .filter(item => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
    
    console.log(`[DEBUG] Portfolio items found: ${items.length}`);
    return items;
  });
};
