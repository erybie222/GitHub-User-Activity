import https from "https";

// Get command-line arguments
const args = process.argv.slice(2);
const username = args[1];

// Define the GitHub API URL for user activity
const url = `https://api.github.com/users/${username}/events`;

// Check if the correct command is provided
if (args[0] === "github-activity" && username) {
  fetchActivity(url, username);
}

/**
 * Fetch GitHub user activity from the API.
 * @param {string} url - The GitHub API endpoint for user events.
 * @param {string} username - The GitHub username provided as an argument.
 */
function fetchActivity(url, username) {
  // Send an HTTPS request to GitHub API
  https.get(url, { headers: { "User-Agent": "Node.js" } }, (res) => {
    // Handle different HTTP response codes
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

    // Collect data chunks from the response
    res.on("data", (chunk) => {
      data += chunk;
    });

    // Process data after receiving the full response
    res.on("end", () => {
      try {
        // Parse the response data as JSON
        data = JSON.parse(data);

        // Validate if the response is an array (list of events)
        if (!Array.isArray(data)) {
          console.log("❌ Error: Unexpected response format.");
          process.exit(1);
        }

        // Check if the user has any activity
        if (data.length === 0) {
          console.log("ℹ️ User hasn't been active.");
          return;
        }

        // Display recent activity
        console.log(`📌 Recent GitHub Activity for ${username}:`);
        data.forEach((event, index) => {
          console.log(`🔹 [${index + 1}] ${event.type} in ${event.repo.name}`);
        });
      } catch (error) {
        // Handle JSON parsing errors
        console.log("❌ Error parsing response:", error.message);
        process.exit(1);
      }
    });

    // Handle HTTP request errors
    res.on("error", (error) => {
      console.log("❌ HTTP request error:", error.message);
    });
  });
}
