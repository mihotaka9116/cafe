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

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)'; // 下スクロールで隠す
  } else {
    header.style.transform = 'translateY(0)';    // 上スクロールで出す
  }
  lastScroll = currentScroll;
});

const filterButtons = document.querySelectorAll('.filter-btn');
const cafeItems = document.querySelectorAll('.content');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. ボタンの活性状態（色の変化）を切り替える
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. フィルタリング実行
        const filterValue = button.getAttribute('data-filter');

        cafeItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.classList.remove('is-hidden');
                // ふわっと再表示させるためにアニメーションクラスを一度外して付け直すのもアリです
                item.classList.add('is-active'); 
            } else {
                item.classList.add('is-hidden');
            }
        });
    });
});
