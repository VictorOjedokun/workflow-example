const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My Docker App</title>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --surface: #13131a;
          --border: #1e1e2e;
          --accent: #00e5ff;
          --accent2: #ff6b6b;
          --text: #e8e8f0;
          --muted: #6b6b80;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .grid-bg {
          position: fixed; inset: 0; z-index: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridShift 20s linear infinite;
        }

        @keyframes gridShift {
          from { background-position: 0 0; }
          to { background-position: 48px 48px; }
        }

        .glow {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none; z-index: 0;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
        }

        .card {
          position: relative; z-index: 1;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 56px 64px;
          max-width: 580px; width: 90%;
          text-align: center;
          box-shadow: 0 0 60px rgba(0,229,255,0.07), 0 40px 80px rgba(0,0,0,0.5);
          animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: var(--accent);
          margin-bottom: 28px;
          animation: slideUp 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          animation: blink 1.2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.2; }
        }

        h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          margin-bottom: 16px;
          animation: slideUp 0.7s 0.15s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        h1 span { color: var(--accent); }

        p {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 400;
          margin-bottom: 40px;
          animation: slideUp 0.7s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .stats {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 16px; margin-bottom: 40px;
          animation: slideUp 0.7s 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .stat {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 18px 12px;
        }

        .stat-val {
          font-size: 1.4rem; font-weight: 700;
          color: var(--accent); margin-bottom: 4px;
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px; color: var(--muted);
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        .cmd {
          background: #0d0d14;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 14px 20px;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          color: #a0f0a0;
          text-align: left;
          animation: slideUp 0.7s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .cmd span { color: var(--muted); }
      </style>
    </head>
    <body>
      <div class="grid-bg"></div>
      <div class="glow"></div>
      <div class="card">
        <div class="badge"><div class="dot"></div> Container Running</div>
        <h1>Hello from <span>Rhemapath</span></h1>
        <p>This class is being taught by Mr Victor. App runs on port 3000.</p>
        <div class="stats">
          <div class="stat">
            <div class="stat-val">Node</div>
            <div class="stat-label">Runtime</div>
          </div>
          <div class="stat">
            <div class="stat-val">3000</div>
            <div class="stat-label">Port</div>
          </div>
          <div class="stat">
            <div class="stat-val">✓</div>
            <div class="stat-label">Healthy</div>
          </div>
        </div>
        <div class="cmd"><span>$</span> docker run -p 3000:3000 my-app</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
