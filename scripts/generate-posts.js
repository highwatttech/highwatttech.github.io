const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../posts");
const output = [];

for (const folder of fs.readdirSync(postsDir)) {
    const postPath = path.join(postsDir, folder, "index.md");

    if (!fs.existsSync(postPath)) continue;

    const content = fs.readFileSync(postPath, "utf8");

    const match = content.match(/^---([\s\S]*?)---/);

    if (!match) continue;

    const frontmatter = match[1];

    const title = frontmatter.match(/title:\s*"(.+)"/)?.[1];
    const date = frontmatter.match(/date:\s*"(.+)"/)?.[1];

    output.push({
        slug: folder,
        title,
        date,
        file: `posts/${folder}/index.md`
    });
}

fs.writeFileSync(
    "posts.json",
    JSON.stringify(output, null, 2)
);

console.log("Generated posts.json");