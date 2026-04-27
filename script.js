/**
 * K8S Lab – script.js
 * Author: HuyLN
 */

// ── CONSTANTS ──────────────────────────────────────────
const LESSON_TITLES = [
  'Bài 01: Kubernetes Architecture',
  'Bài 02: Kubernetes Cluster',
  'Bài 03: Kubernetes Workloads',
  'Bài 04: Kubernetes Networking',
  'Bài 05: Deployment & ReplicaSet',
  'Bài 06: Service & Networking',
  'Bài 07: ConfigMap & Secret',
  'Bài 08: Storage & PersistentVolume',
  'Bài 09: Ingress & LoadBalancer',
  'Bài 10: RBAC & Security',
  'Bài 11: Rolling Update & Rollback',
  'Bài 12: Monitoring & Logging',
  'Bài 13: Scheduling Nâng cao',
  'Bài 14: CI/CD với Kubernetes',
];

const TOTAL_LESSONS = 14;
const AVAILABLE_LESSONS = 3; // bài 01, 02 và 03

// ── STATE ──────────────────────────────────────────────
let currentLesson = 0;

// ── DOM REFS ───────────────────────────────────────────
const sidebar        = document.getElementById('sidebar');
const overlay        = document.getElementById('overlay');
const hamburger      = document.getElementById('hamburger');
const sidebarClose   = document.getElementById('sidebarClose');
const lessonItems    = document.querySelectorAll('.lesson-item');
const lessonContents = document.querySelectorAll('.lesson-content');
const comingSoonPage = document.getElementById('coming-soon-page');
const breadcrumb     = document.getElementById('breadcrumbCurrent');
const navIndicator   = document.getElementById('navIndicator');
const prevBtn        = document.getElementById('prevBtn');
const nextBtn        = document.getElementById('nextBtn');
const copyToast      = document.getElementById('copyToast');

// ── SIDEBAR TOGGLE ─────────────────────────────────────
function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openSidebar);
sidebarClose.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// ── LESSON NAVIGATION ──────────────────────────────────
function goToLesson(index) {
  if (index < 0 || index >= TOTAL_LESSONS) return;

  // Update active state on sidebar items
  lessonItems.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  // Hide all lesson content panels
  lessonContents.forEach(lc => lc.classList.remove('active'));
  comingSoonPage.classList.remove('visible');
  comingSoonPage.classList.add('hidden');

  if (index < AVAILABLE_LESSONS) {
    // Show the actual lesson
    const target = document.getElementById(`lesson-${index}`);
    if (target) target.classList.add('active');
  } else {
    // Show coming soon page
    comingSoonPage.classList.remove('hidden');
    comingSoonPage.classList.add('visible');
  }

  // Update breadcrumb
  breadcrumb.textContent = LESSON_TITLES[index];

  // Update nav indicator
  navIndicator.textContent = `${index + 1} / ${TOTAL_LESSONS}`;

  // Update nav buttons
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === TOTAL_LESSONS - 1;

  currentLesson = index;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Close sidebar on mobile
  if (window.innerWidth <= 900) {
    closeSidebar();
  }
}

// Sidebar lesson item clicks
lessonItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('coming-soon')) return;
    goToLesson(i);
  });
});

// Bottom nav buttons
prevBtn.addEventListener('click', () => goToLesson(currentLesson - 1));
nextBtn.addEventListener('click', () => goToLesson(currentLesson + 1));

// ── COPY TO CLIPBOARD ──────────────────────────────────
let toastTimer = null;

function showToast() {
  copyToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    copyToast.classList.remove('show');
  }, 2000);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;

  const code = btn.dataset.code;
  if (!code) return;

  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ Đã sao chép';
    btn.classList.add('copied');
    showToast();

    setTimeout(() => {
      btn.textContent = 'Sao chép';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for environments without clipboard API
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);

    btn.textContent = '✓ Đã sao chép';
    btn.classList.add('copied');
    showToast();

    setTimeout(() => {
      btn.textContent = 'Sao chép';
      btn.classList.remove('copied');
    }, 2000);
  });
});

// ── QUIZ HANDLING ──────────────────────────────────────
document.addEventListener('click', (e) => {
  const opt = e.target.closest('.quiz-opt');
  if (!opt) return;

  const quizItem = opt.closest('.quiz-item');
  if (!quizItem) return;

  // Already answered?
  if (quizItem.dataset.answered === 'true') return;
  quizItem.dataset.answered = 'true';

  const isCorrect = opt.dataset.correct === 'true';
  const allOpts = quizItem.querySelectorAll('.quiz-opt');
  const explain = quizItem.querySelector('.quiz-explain');

  // Disable all buttons
  allOpts.forEach(o => {
    o.disabled = true;
    if (o.dataset.correct === 'true') {
      o.classList.add('correct');
    }
  });

  if (!isCorrect) {
    opt.classList.add('incorrect');
  }

  // Show explanation
  if (explain) {
    explain.classList.remove('hidden');
    explain.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// ── KEYBOARD NAVIGATION ────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Don't trigger when user is typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    if (currentLesson < TOTAL_LESSONS - 1) goToLesson(currentLesson + 1);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    if (currentLesson > 0) goToLesson(currentLesson - 1);
  }
  if (e.key === 'Escape') {
    closeSidebar();
  }
});

// ── CODE BLOCK: FALLBACK DATA-CODE SYNC ────────────────
// Ensure any code blocks without data-code use the pre content
document.querySelectorAll('.code-block').forEach(block => {
  const btn = block.querySelector('.copy-btn');
  const pre = block.querySelector('pre code');
  if (btn && pre && !btn.dataset.code) {
    btn.dataset.code = pre.textContent;
  }
});

// ── INIT ───────────────────────────────────────────────
(function init() {
  goToLesson(0);

  // Animate lesson items on load
  lessonItems.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-12px)';
    setTimeout(() => {
      item.style.transition = 'opacity .3s ease, transform .3s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    }, 40 + i * 28);
  });
})();
