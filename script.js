// --- 1. ふわっと表示させる（交差監視） ---
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(target => {
    fadeObserver.observe(target);
});

// --- 2. ページ内リンクのスムーズスクロール ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// --- 3. トップに戻るボタン & ヘッダーの制御 ---
const toTopBtn = document.getElementById('to-top');
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // トップに戻るボタンの表示
    if (currentScroll > 300) {
        toTopBtn.classList.add('show');
    } else {
        toTopBtn.classList.remove('show');
    }

    // ヘッダーの出し入れ（下スクロールで隠し、上スクロールで出す）
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

const cafeItems = document.querySelectorAll('.content, .index-list li'); // INDEXのliも対象に含める
