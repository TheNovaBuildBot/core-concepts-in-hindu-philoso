module.exports = function(eleventyConfig) {
  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Blog posts collection
  eleventyConfig.addCollection("blog", function(collection) {
    return collection
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Date formatting filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(date));
  });

  // ISO date filter
  eleventyConfig.addFilter("dateToISO", function(date) {
    return new Date(date).toISOString();
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    },
    templateFormats: ["njk", "md"]
  };
};
