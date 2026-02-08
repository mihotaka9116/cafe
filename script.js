// --- 1. ふわっと表示させる（交差監視） ---
// 画面内に要素が入ってきたら 'is-active' クラスを付与します
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-active');
      // 一度表示されたら監視を止める場合は下の行を有効にする
      // fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(target => {
  fadeObserver.observe(target);
});

// --- 2. ページ内リンクのスムーズスクロール ---
// リンクをクリックした時にスルスルと移動させます
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // ページトップへ戻るリンク（href="#"）などの処理
    if (href !== "#" && href !== "") {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// --- 3. トップに戻るボタンの表示制御 ---
// 300pxスクロールしたらボタンを表示、戻ったら非表示にします
const toTopBtn = document.getElementById('to-top');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    toTopBtn.classList.add('show');
  } else {
    toTopBtn.classList.remove('show');
  }
});