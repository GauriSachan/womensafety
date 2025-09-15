const API = "http://localhost:5000/api";
const token = localStorage.getItem("safeher_token");

const quizArea = document.getElementById("quizArea");
const badgeArea = document.getElementById("badgeArea");
const shareBtn = document.getElementById("shareBadgeBtn");

async function loadBadges() {
  badgeArea.innerHTML = '<p class="muted">Loading badges...</p>';
  if (!token) { badgeArea.innerHTML = '<p class="muted">Login to see badges</p>'; return; }
  try {
    const res = await fetch(`${API}/badges`, { headers: { Authorization: "Bearer " + token }});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed');
    if (!data.badges || data.badges.length===0) badgeArea.innerHTML = '<p class="muted">No badges yet</p>';
    else badgeArea.innerHTML = data.badges.map(b => `<div class="badge">${b}</div>`).join('');
  } catch(err) {
    badgeArea.innerHTML = '<p class="muted">Could not load badges</p>';
  }
}

async function loadQuestions() {
  if (!token) {
    quizArea.innerHTML = `<p class="muted">Please <a href="index.html">login</a> to take today's quiz.</p>`;
    return;
  }
  quizArea.innerHTML = `<p class="muted">Fetching today's questions...</p>`;
  try {
    const res = await fetch(`${API}/questions/today`, { headers: { Authorization: "Bearer " + token }});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch');
    if (!data.questions || data.questions.length===0) { quizArea.innerHTML = '<p class="muted">No questions available today.</p>'; return; }

    renderQuizUI(data.questions);
  } catch(err) {
    console.error(err);
    quizArea.innerHTML = `<p class="muted">Failed to load questions. Try again later.</p>`;
  }
}

function renderQuizUI(questions) {
  const html = [];
  html.push(`<form id="quizForm">`);
  questions.forEach((q, i) => {
    html.push(`<div class="qcard card" data-qid="${q.id}">
      <h4>Q${i+1}. ${q.text}</h4>`);
    q.options.forEach((o, idx) => {
      html.push(`<label style="display:block;margin:6px 0">
        <input type="radio" name="${q.id}" value="${idx}"> ${o}
      </label>`);
    });
    html.push(`</div>`);
  });
  html.push(`<div style="margin-top:12px"><button class="btn" type="submit">Submit Quiz</button></div>`);
  html.push(`</form>`);
  quizArea.innerHTML = html.join("");

  document.getElementById("quizForm").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const answers = {};
    for (const pair of formData.entries()){
      answers[pair[0]] = Number(pair[1]);
    }
    // submit
    try {
      const res = await fetch(`${API}/quiz/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ answers })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submit failed');
      alert(`Quiz submitted: ${data.result.correct}/${data.result.total} (${data.result.pct}%)`);
      loadBadges();
    } catch(err){
      alert("Failed to submit: " + err.message);
    }
  });
}

shareBtn?.addEventListener("click", async ()=>{
  // share first badge if exists
  const badges = badgeArea.querySelectorAll(".badge");
  if (!badges || badges.length===0) { alert("No badges to share"); return; }
  const text = `I earned badges on SafeHer: ${Array.from(badges).map(b=>b.textContent).join(", ")}`;
  if (navigator.share) {
    try { await navigator.share({ title: "SafeHer Badges", text }); alert("Shared!"); }
    catch(e){ alert("Share cancelled"); }
  } else {
    try { await navigator.clipboard.writeText(text); alert("Copied to clipboard"); }
    catch(e){ alert("Unable to copy"); }
  }
});

window.addEventListener("load", ()=> {
  // show login if not logged
  if (!token) {
    document.getElementById("subhead").textContent = "Login to fetch today's quiz and track badges.";
    document.getElementById("loginNav").addEventListener("click", ()=> window.location.href = "index.html");
  } else {
    loadQuestions();
    loadBadges();
  }
});
