document.addEventListener("DOMContentLoaded", function() {
  // Pi SDK Initialization
  if (window.Pi) {
    window.Pi.init({ version: "2.0", sandbox: true });
    console.log("Pi SDK initialized in Sandbox mode");
  } else {
    console.error("Pi SDK not available");
    document.getElementById("userStatus").textContent = "Pi SDK unavailable";
  }

  // Multilingual Support with i18next
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          chatbot_desc: "Ask about Pi Network, from mining to wallets!",
          security_title: "Find Security Circle",
          security_desc: "Connect with trusted Pioneers to boost your mining rate.",
          profile_title: "Share Profile",
          profile_desc: "Share your Pi username to grow your network.",
          donate_title: "Donate",
          donate_desc: "Support GuidebotPI with Pi donations!",
          official_title: "Official Channels",
          founders_title: "Founders",
          business_title: "Verified Businesses",
          business_desc: "Explore KYB-verified partners integrated with Pi.",
          faq_title: "Pi FAQs",
          faq_desc: "Get answers from the official Pi FAQ.",
          blockchain_title: "Blockchain Explorer",
          blockchain_desc: "Explore Pi Network’s blockchain transactions.",
          ask_button: "Ask",
          find_button: "Find Pioneers",
          share_button: "Share",
          donate_button: "Donate Now",
          x_link: "X",
          facebook_link: "Facebook",
          telegram_link: "Telegram",
          youtube_link: "YouTube",
          faq_link: "Visit Pi FAQ",
          blockexplorer_link: "Visit Blockexplorer",
          join_pi: "Join Pi",
          privacy_link: "Privacy",
          terms_link: "Terms",
          ask_placeholder: "Ask about Pi...",
          username_placeholder: "Enter your Pi username"
        }
      },
      sw: {
        translation: {
          chatbot_desc: "Uliza kuhusu Mtandao wa Pi, kutoka kwa uchimbaji hadi pochi!",
          security_title: "Pata Mduara wa Usalama",
          security_desc: "Ungana na Wapainia wanaoaminika ili kuongeza kasi yako ya uchimbaji.",
          profile_title: "Shiriki Profaili",
          profile_desc: "Shiriki jina lako la mtumiaji wa Pi ili kupanua mtandao wako.",
          donate_title: "Changia",
          donate_desc: "Saidia GuidebotPI kwa michango ya Pi!",
          official_title: "Njia Rasmi",
          founders_title: "Waanza",
          business_title: "Biashara Zilizothibitishwa",
          business_desc: "Chunguza washirika waliothibitishwa na KYB waliounganishwa na Pi.",
          faq_title: "Maswali ya Pi",
          faq_desc: "Pata majibu kutoka kwa Maswali ya Pi rasmi.",
          blockchain_title: "Mchunguzi wa Blockchain",
          blockchain_desc: "Chunguza miamala ya blockchain ya Mtandao wa Pi.",
          ask_button: "Uliza",
          find_button: "Pata Wapainia",
          share_button: "Shiriki",
          donate_button: "Changia Sasa",
          x_link: "X",
          facebook_link: "Facebook",
          telegram_link: "Telegram",
          youtube_link: "YouTube",
          faq_link: "Tembelea Maswali ya Pi",
          blockexplorer_link: "Tembelea Mchunguzi wa Blockchain",
          join_pi: "Jiunge na Pi",
          privacy_link: "Sera ya Faragha",
          terms_link: "Masharti ya Huduma",
          ask_placeholder: "Uliza kuhusu Pi...",
          username_placeholder: "Ingiza jina lako la mtumiaji wa Pi"
        }
      },
      af: {
        translation: {
          chatbot_desc: "Vra oor die Pi Netwerk, van mynbou tot beursies!",
          security_title: "Vind Sekuriteitsirkel",
          security_desc: "Verbind met betroubare Pioniers om jou myntempo te verhoog.",
          profile_title: "Deel Profiel",
          profile_desc: "Deel jou Pi-gebruikersnaam om jou netwerk uit te brei.",
          donate_title: "Skenk",
          donate_desc: "Ondersteun GuidebotPI met Pi-skenkings!",
          official_title: "Amptelike Kanal",
          founders_title: "Stigters",
          business_title: "Geverifieerde Besighede",
          business_desc: "Verken KYB-geverifieerde vennote wat met Pi geïntegreer is.",
          faq_title: "Pi Vrae",
          faq_desc: "Kry antwoorde uit die amptelike Pi Vrae.",
          blockchain_title: "Blockchain Verkenner",
          blockchain_desc: "Verken Pi Netwerk se blockchain transaksies.",
          ask_button: "Vra",
          find_button: "Vind Pioniers",
          share_button: "Deel",
          donate_button: "Skenk Nou",
          x_link: "X",
          facebook_link: "Facebook",
          telegram_link: "Telegram",
          youtube_link: "YouTube",
          faq_link: "Besoe Pi Vrae",
          blockexplorer_link: "Besoe Blockchain Verkenner",
          join_pi: "Sluit aan by Pi",
          privacy_link: "Privaatheidsbeleid",
          terms_link: "Diensvoorwaardes",
          ask_placeholder: "Vra oor Pi...",
          username_placeholder: "Voer jou Pi-gebruikersnaam in"
        }
      }
    }
  }, function(err) {
    if (err) console.error("i18next initialization failed:", err);
    updateLanguage();
  });

  function updateLanguage() {
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.getAttribute("data-i18n");
      element.textContent = i18next.t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      const key = element.getAttribute("data-i18n-placeholder");
      element.placeholder = i18next.t(key);
    });
  }

  document.getElementById("languageSelect").addEventListener("change", function() {
    i18next.changeLanguage(this.value, updateLanguage);
  });

  // Pi Authentication
  const loginBtn = document.getElementById("loginBtn");
  const userStatus = document.getElementById("userStatus");
  loginBtn.addEventListener("click", () => {
    if (window.Pi) {
      window.Pi.authenticate()
        .then(auth => {
          userStatus.textContent = `Logged in as: ${auth.user.username}`;
          localStorage.setItem("piUser", auth.user.username);
        })
        .catch(error => {
          userStatus.textContent = `Login failed: ${error.message}`;
        });
    } else {
      userStatus.textContent = "Pi SDK not available";
    }
  });

  // Check if already logged in
  const savedUser = localStorage.getItem("piUser");
  if (savedUser) userStatus.textContent = `Logged in as: ${savedUser}`;

  // Tab Switching
  const tabButtons = document.querySelectorAll(".menu a");
  const tabContents = document.querySelectorAll("section");
  tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      tabContents.forEach(content => content.classList.add("hidden"));
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.remove("hidden");
      menu.classList.remove("show");
    });
  });

  // Initial active tab
  document.querySelector(".menu a.active").click();

  // Menu Toggle
  const menuIcon = document.querySelector(".menu-icon");
  const menu = document.querySelector(".menu");
  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Chatbot
  const chatForm = document.getElementById("chatForm");
  const userQuestion = document.getElementById("userQuestion");
  const responseDiv = document.getElementById("response");
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = userQuestion.value.trim().toLowerCase();
    if (!question) return;
    fetch("responses.json")
      .then(res => res.json())
      .then(data => {
        let answer = data.default;
        for (let key in data.responses) {
          if (question.includes(key)) {
            answer = data.responses[key];
            break;
          }
        }
        responseDiv.innerHTML = `<p><strong>${i18next.t("chatbot_response")}:</strong> ${answer}</p>`;
        userQuestion.value = "";
      })
      .catch(err => {
        responseDiv.innerHTML = `<p>${i18next.t("error_response")}</p>`;
        console.error("Error loading responses:", err);
      });
  });

  // Security Circle
  const findCircle = document.getElementById("findCircle");
  const circleResult = document.getElementById("circleResult");
  findCircle.addEventListener("click", () => {
    circleResult.innerHTML = `<p>${i18next.t("circle_result")}</p>`;
  });

  // Profile Sharing
  const shareBtn = document.getElementById("shareBtn");
  const username = document.getElementById("username");
  const shareResult = document.getElementById("shareResult");
  shareBtn.addEventListener("click", () => {
    const user = username.value.trim();
    if (user) {
      shareResult.innerHTML = `<p>${i18next.t("share_result")} <strong>${user}</strong> - <a href="[invalid url, do not cite] target="_blank">${i18next.t("invite_link")}</a></p>`;
      username.value = "";
    } else {
      shareResult.innerHTML = `<p>${i18next.t("share_error")}</p>`;
    }
  });

  // Donation with Pi SDK
  const donateBtn = document.getElementById("donateBtn");
  const donateStatus = document.getElementById("donateStatus");
  donateBtn.addEventListener("click", () => {
    if (window.Pi) {
      window.Pi.createPayment({
        amount: 0.1,
        memo: "Support GuidebotPI",
        metadata: { app: "GuidebotPI" }
      }, {
        onReadyForServerApproval: paymentId => {
          console.log("Payment ready:", paymentId);
          donateStatus.textContent = i18next.t("donate_pending");
        },
        onReadyForServerCompletion: (paymentId, txid) => {
          console.log("Payment completed:", txid);
          donateStatus.textContent = i18next.t("donate_success");
        },
        onCancel: () => {
          donateStatus.textContent = i18next.t("donate_cancel");
        },
        onError: error => {
          donateStatus.textContent = `${i18next.t("donate_error")}: ${error.message}`;
        }
      });
    } else {
      donateStatus.textContent = i18next.t("donate_unavailable");
    }
  });

  // FAQ Response
  const faqResponse = document.getElementById("faqResponse");
  faqResponse.innerHTML = `<p>${i18next.t("faq_info")}</p>`;
});

// Additional i18next translations
i18next.on("initialized", function() {
  i18next.store.data.en.translation.chatbot_response = "GuidebotPI";
  i18next.store.data.en.translation.error_response = "Error loading response. Try again.";
  i18next.store.data.en.translation.circle_result = "Searching for Pioneers... Connect via X or Facebook links!";
  i18next.store.data.en.translation.share_result = "Shared";
  i18next.store.data.en.translation.share_error = "Please enter a username.";
  i18next.store.data.en.translation.invite_link = "Invite at minepi.com/