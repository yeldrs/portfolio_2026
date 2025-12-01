// validate-frontmatter.js
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const allowedKeys = [
  "title",
  "client",
  "description",
  "role",
  "roleDescription",
  "context",
  "problem",
  "keyInsights",
  "methodology",
  "designConception",
  "delivery",
  "metrics",
  "publishDate",
  "isDraft",
];

const contentDir = path.join(__dirname, "src", "content", "projects");

fs.readdirSync(contentDir).forEach((file) => {
  if (file.endsWith(".md")) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);

    const invalidKeys = Object.keys(data).filter(
      (key) => !allowedKeys.includes(key.trim().replace(/\u00A0/g, ""))
    );

    if (invalidKeys.length > 0) {
      console.log(`❌ ${file} has invalid keys:`, invalidKeys);
    } else {
      console.log(`✅ ${file} is valid.`);
    }
  }
});
