document.addEventListener("DOMContentLoaded", function() {
  // Pi SDK Initialization
  if (window.Pi) {
    window.Pi.init({ version: "2.0", sandbox: true });
    console.log("Pi SDK initialized in Sandbox mode");
  }

  // Navigation and Tab Switching
  const menuLinks = document.querySelectorAll(".menu a");
  const sections = document.querySelectorAll("section");
  const menuIcon = document.querySelector(".menu-icon");
  const menu = document.querySelector(".menu");

  menuIcon.addEventListener("click", () => menu.classList.toggle("active"));

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      sections.forEach(section => {
        section.classList.toggle("hidden", section.id !== targetId);
      });
      menuLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      menu.classList.remove("active");
    });
  });

  // Chatbot Functionality
  const chatForm = document.getElementById("chatForm");
  const userQuestion = document.getElementById("userQuestion");
  const responseDiv = document.getElementById("response");

  fetch("responses.json")
    .then(res => res.json())
    .then(data => {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const question = userQuestion.value.trim().toLowerCase();
        if (!question) return;
        let answer = data.default || "I don’t know that—try another Pi question!";
        for (let key in data.responses) {
          if (question.includes(key)) {
            answer = data.responses[key];
            break;
          }
        }
        responseDiv.innerHTML = `<p><strong>GuidebotPI:</strong> ${answer}</p>`;
        userQuestion.value = "";
      });
    })
    .catch(err => {
      console.error("Error loading responses:", err);
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        responseDiv.innerHTML = `<p><strong>GuidebotPI:</strong> Can’t load answers—try again later!</p>`;
      });
    });

  // Share Profile Functionality
  const shareBtn = document.getElementById("shareBtn");
  const username = document.getElementById("username");
  const shareResult = document.getElementById("shareResult");

  shareBtn.addEventListener("click", () => {
    const user = username.value.trim();
    if (user) {
      shareResult.innerHTML = `<p>Shared: <strong>${user}</strong> - Invite at <a href="https://minepi.com/Bradkay">minepi.com/Bradkay</a></p>`;
    } else {
      shareResult.innerHTML = `<p>Please enter a username!</p>`;
    }
  });
});
