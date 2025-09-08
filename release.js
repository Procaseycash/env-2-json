#!/usr/bin/env node
const { execSync } = require('child_process');

function run(cmd) {
    console.log(`\n👉 Running: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
}

const type = process.argv[2] || "patch"; // patch | minor | major

try {

    run("git add .");

    run("git commit -m \"chore: pre-release changes\"");

    // 1. Bump version in package.json & create git commit + tag
    run(`npm version ${type} -m "chore(release): %s"`);

    // 2. Push commits and tags
    run("git push origin main --tags");

    // 3. Publish to npm
    run("npm publish --access public");

    console.log("\n✅ Release complete!");
} catch (err) {
    console.error("\n❌ Release failed:", err.message);
    process.exit(1);
}
