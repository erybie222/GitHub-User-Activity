PROJECT URL: https://roadmap.sh/projects/github-user-activity
### 📌 **GitHub User Activity CLI**
GitHub User Activity CLI is a **command-line tool** that fetches and displays the **recent activity** of a GitHub user.

## 🚀 **Features**
- ✅ Fetches **recent GitHub user activity**.
- ✅ Displays activity types (**PushEvent, CreateEvent, StarEvent**, etc.).
- ✅ Handles API errors gracefully (**invalid username, rate limit exceeded**).
- ✅ Works without external dependencies (**uses built-in Node.js modules**).

---

## 📦 **Installation**

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/your-username/GitHub-User-Activity.git
cd GitHub-User-Activity
```

### **2️⃣ Ensure Node.js is installed**
Check if Node.js is installed:
```sh
node -v
```
If not installed, download it from [nodejs.org](https://nodejs.org/).

### **3️⃣ Create a `.env` file (optional for API tokens)**
If you want to use an **API token** to avoid GitHub rate limits:
```sh
touch .env
echo "API_TOKEN=your_personal_access_token" >> .env
```
⚠ **Do not share your API token!**

---

## 🛠 **Usage**

Run the script using **Node.js**:
```sh
node index.js github-activity <GitHub-username>
```

### **Example:**
```sh
node index.js github-activity octocat
```

### **Output:**
```
📌 Recent GitHub Activity for octocat:
🔹 [1] PushEvent in octocat/Hello-World
🔹 [2] CreateEvent in octocat/Repo
🔹 [3] Starred octocat/Developer-Roadmap
```

---

## ❌ **Handling Errors**
| **Error** | **Cause** | **Solution** |
|-----------|----------|-------------|
| `❌ Error: User 'username' not found.` | Invalid GitHub username | Check the username and try again |
| `❌ Error: Rate limit exceeded.` | Too many requests to GitHub API | Wait for reset or use an API token |
| `❌ Error: Unexpected response format.` | API response changed | Check GitHub API docs |

---

## 🔥 **Future Enhancements**
- ✅ **Filter activity by event type** (e.g., only `PushEvent`).
- ✅ **Format output with colors for better readability**.
- ✅ **Cache recent activity to reduce API calls**.

---

## 📝 **License**
This project is **open-source**. Feel free to use and contribute! 🚀

---

## **✅ How to Add README to Your Repository**
1. **Save the file as** `README.md` in your project root.
2. **Add the file to Git:**
   ```sh
   git add README.md
   git commit -m "Added README file"
   git push origin main
   ```
