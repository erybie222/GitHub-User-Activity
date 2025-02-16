import https from "https";
import dotenv from "dotenv";

dotenv.config();

const args = process.argv.slice(2);
const username = args[1];
const url = `https://api.github.com/users/${username}/events`;

if (args[0] === "github-activity" && username) {
  fetchActivity(url, username);
}

function fetchActivity(url, username) {
  https.get(url, { headers: { "User-Agent": "Node.js" } }, (res) => {
    if (res.statusCode === 404) {
      console.log(`❌ Error: User '${username}' not found.`);
      process.exit(1);
    }
    if (res.statusCode === 403) {
      console.log("❌ Error: Rate limit exceeded. Try again later.");
      process.exit(1);
    }
    if (res.statusCode >= 500) {
      console.log("❌ Error: GitHub API is down. Try again later.");
      process.exit(1);
    }
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      try {
        data = JSON.parse(data);
        if (!Array.isArray(data)) {
          console.log("❌ Error: Unexpected response format.");
          process.exit(1);
        }
        if (data.length === 0) {
          console.log("User hasn't been active");
        }
        console.log(`📌 Recent GitHub Activity for ${username}:`);
        data.forEach((event, index) => {
          console.log(`🔹[${index + 1}] ${event.type} in ${event.repo.name}`);
        });
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    });
    res.on("error", (error) => {
      console.log("❌ HTTP request error:", error.message);
    });
  });
}
