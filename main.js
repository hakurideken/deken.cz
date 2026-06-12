function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return n.toString();
}

async function loadStats() {
  // Discord — official widget API
  try {
    const res = await fetch('https://discord.com/api/guilds/1042880151614144592/widget.json');
    if (res.ok) {
      const data = await res.json();
      const count = data.approximate_member_count || data.presence_count;
      if (count) {
        const el = document.querySelector('.stat:nth-child(3) .stat-num');
        if (el) el.textContent = formatNum(count);
      }
    }
  } catch {}

  // Kick — neoficiální API
  try {
    const res = await fetch('https://kick.com/api/v1/channels/hakurideken');
    if (res.ok) {
      const data = await res.json();
      const count = data.followersCount ?? data.followers_count ?? data.user?.followers_count;
      if (count != null) {
        const el = document.querySelector('.stat:nth-child(1) .stat-num');
        if (el) el.textContent = formatNum(count);
      }
      const badge = document.getElementById('liveStatus');
      if (badge) {
        const isLive = !!data.livestream;
        badge.className = 'live-badge ' + (isLive ? 'live-online' : 'live-offline');
        badge.querySelector('.live-text').textContent = isLive ? 'LIVE' : 'OFFLINE';
      }
    }
  } catch {}
}

if (document.querySelector('.about-stats')) loadStats();
