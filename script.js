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

    // ヘッダーの出し入れ
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// --- 4. エリアフィルタリング機能 ---
const filterButtons = document.querySelectorAll('.filter-btn');
const cafeItems = document.querySelectorAll('.content, .index-list li');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // ボタンの活性状態（色の変化）を切り替える
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const targetArea = button.getAttribute('data-filter');

        cafeItems.forEach(item => {
            // フィルタリング処理
            if (targetArea === 'all' || item.classList.contains(targetArea)) {
                item.classList.remove('is-hidden');
                // ふわっと表示させるクラスを一度外して付け直す（アニメーションの再発火）
                item.classList.remove('is-active');
                setTimeout(() => item.classList.add('is-active'), 10);
            } else {
                item.classList.add('is-hidden');
            }
        });
    });
});
