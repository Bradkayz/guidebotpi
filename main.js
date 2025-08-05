document.addEventListener("DOMContentLoaded", function() {
  if (window.Pi) {
    window.Pi.init({ version: "2.0", sandbox: true });
    console.log("Pi SDK initialized in Sandbox mode");
  } else {
    console.log("Pi SDK not available");
  }

  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll("section");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach(content => content.classList.add("hidden"));
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
    });
  });

  // Initial active tab
  document.querySelector(".tab-button.active").click();

  // Menu toggle for mobile
  const menuIcon = document.querySelector(".menu-icon");
  const menu = document.querySelector(".menu");
  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Chatbot functionality
  const chatForm = document.getElementById("chatForm");
  const userQuestion = document.getElementById("userQuestion");
  const responseDiv = document.getElementById("response");

  chatForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const question = userQuestion.value.trim();
    if (question) {
      fetch("responses.json")
        .then(response => response.json())
        .then(data => {
          const answer = data[question.toLowerCase()] || "Sorry, I don't have an answer for that yet.";
          responseDiv.innerHTML = `<p><strong>You asked:</strong> ${question}<br><strong>Answer:</strong> ${answer}</p>`;
          userQuestion.value = "";
        })
        .catch(error => {
          responseDiv.innerHTML = "<p>Error loading response. Try again later.</p>";
          console.error("Error:", error);
        });
    }
  });

  // Profile sharing
  const shareBtn = document.getElementById("shareBtn");
  const usernameInput = document.getElementById("username");
  const shareResult = document.getElementById("shareResult");

  shareBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
      const referralLink = `https://minepi.com/${username}`;
      shareResult.innerHTML = `<p>Shared: ${username} - <a href="${referralLink}" target="_blank">Invite at ${referralLink}</a></p>`;
      usernameInput.value = "";
    } else {
      shareResult.innerHTML = "<p>Please enter a username.</p>";
    }
  });
});