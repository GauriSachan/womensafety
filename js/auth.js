const API_URL = "http://localhost:5000";

// ================== SIGNUP ==================
if (document.getElementById("signupForm")) {
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      document.getElementById("signupMessage").innerText = data.message || data.error;

      if (data.message) {
        document.getElementById("otpSection").style.display = "block";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("signupMessage").innerText = "Server error. Try again later.";
    }
  });
}

// ================== VERIFY OTP ==================
async function verifyOtp() {
  const email = document.getElementById("signupEmail").value;
  const otp = document.getElementById("signupOtp").value;

  try {
    const res = await fetch(`${API_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    alert(data.message || data.error);

    if (data.message) {
      document.getElementById("otpSection").style.display = "none";
      // After successful OTP verification, redirect back to index.html
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Try again later.");
  }
}

// ================== LOGIN ==================
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      document.getElementById("loginMessage").innerText = data.message || data.error;

      if (data.token) {
        localStorage.setItem("token", data.token);
        // Redirect to index.html after login
        window.location.href = "index.html";
      }
    } catch (err) {
      console.error(err);
      document.getElementById("loginMessage").innerText = "Server error. Try again later.";
    }
  });
}
