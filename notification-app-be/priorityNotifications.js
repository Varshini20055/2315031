const priority = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function getTopNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          "Authorization": " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE1MDMxQG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NzcwNTUsImlhdCI6MTc4Mjk3NjE1NSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImU4NzY3MmQ1LTA3MTMtNGFjMC05ZTQ2LWUwY2Q1MzllMjYxMCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InBhY2tpYSB2YXJzaGluaSIsInN1YiI6IjlkODc3NzY2LTczNGItNDE4ZC04NGZiLTM2ZjllZjk4NjY2MSJ9LCJlbWFpbCI6IjIzMTUwMzFAbmVjLmVkdS5pbiIsIm5hbWUiOiJwYWNraWEgdmFyc2hpbmkiLCJyb2xsTm8iOiIyMzE1MDMxIiwiYWNjZXNzQ29kZSI6IkVSelV5eCIsImNsaWVudElEIjoiOWQ4Nzc3NjYtNzM0Yi00MThkLTg0ZmItMzZmOWVmOTg2NjYxIiwiY2xpZW50U2VjcmV0IjoiY0RDWE5RQWhaRGNXblFNUCJ9.QWLJZIQqD7kj4jtzaPVGXExaiQi213wlH6WH1Er_A-8",
        },
      }
    );

    const raw = await response.json();

    if (!response.ok) {
      console.log("API Error:", raw);
      return;
    }

    let notifications =
      raw?.data ||
      raw?.notifications ||
      raw ||
      [];

    if (!Array.isArray(notifications)) {
      console.log("Unexpected format:", raw);
      return;
    }

    notifications.sort((a, b) => {
      const p1 = priority[a.notificationType] || 0;
      const p2 = priority[b.notificationType] || 0;

      if (p1 !== p2) return p2 - p1;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    console.log("Top 10 Notifications:");
    console.log(notifications.slice(0, 10));

  } catch (error) {
    console.error("Error:", error.message);
  }
}

getTopNotifications();