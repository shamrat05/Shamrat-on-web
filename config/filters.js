const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // ===========================================
  // FILTERS
  // ===========================================
  
  // Format date for blog posts (e.g., "Dec 8, 2025")
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("LLL d, yyyy");
  });
  
  // Format date for SEO schema (ISO format)
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });
  
  // Read time calculator
  eleventyConfig.addFilter("readTime", (content) => {
    if (!content) return "1 min read";
    const wordsPerMinute = 200;
    // Strip HTML tags for accurate word count
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  });
  
  // Slugify filter for URL generation
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return '';
    return str.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  });

  // Check if string starts with prefix
  eleventyConfig.addFilter("startsWith", (str, prefix) => {
    if (!str || !prefix) return false;
    return str.startsWith(prefix);
  });
};
