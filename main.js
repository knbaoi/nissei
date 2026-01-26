// ========================================
// ページ読み込み時の処理
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('日靜 - ページが読み込まれました');

    // スムーズスクロールの設定
    setupSmoothScroll();

    // ヘッダーのスクロール時の処理
    setupHeaderScroll();

    // フェードインアニメーションの設定
    setupFadeInObserver();

    // モバイルメニューの設定
    setupMobileMenu();
});

// ========================================
// スムーズスクロール
// ========================================
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // ヘッダーの高さを取得 (固定ヘッダー分ずらす)
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // モバイルナビが開いていたら閉じる
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.querySelector('.header__menu-btn').classList.remove('active');
                }
            }
        });
    });
}

// ========================================
// ヘッダーのスクロール時の処理
// ========================================
function setupHeaderScroll() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        // 50px以上スクロールしたら影を追加
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

// ========================================
// モバイルメニュー
// ========================================
function setupMobileMenu() {
    const menuBtn = document.querySelector('.header__menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav__close');

    // メニュー開閉の共通処理
    function toggleMenu(isOpen) {
        if (isOpen) {
            mobileNav.classList.add('active');
            menuBtn.classList.add('active');
            // スクロールを無効化
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('active');
            menuBtn.classList.remove('active');
            // スクロールを有効化
            document.body.style.overflow = '';
        }
    }

    // ハンバーガーボタンクリック
    if (menuBtn && mobileNav) {
        menuBtn.addEventListener('click', function () {
            const isOpen = !mobileNav.classList.contains('active');
            toggleMenu(isOpen);
        });
    }

    // 閉じるボタンクリック
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            toggleMenu(false);
        });
    }

    // メニュー内リンククリックでメニューを閉じる
    const menuLinks = mobileNav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            toggleMenu(false);
        });
    });
}

// ========================================
// フェードインアニメーション (Intersection Observer)
// ========================================
function setupFadeInObserver() {
    const fadeElements = document.querySelectorAll(
        '.section-title, ' +
        '.about__content, ' +
        '.surroundings__content, ' +
        '.activities-preview__item, ' +
        '.rooms__gallery, ' +
        '.floor-info__inner, ' +
        '.amenities__inner, ' +
        '.fireplace__image, ' +
        '.experience-card, ' +
        '.rates__content, ' +
        '.access__info, ' +
        '.faq__list, ' +
        '.contact__inner'
    );

    // 初期状態でfade-inクラスを付与
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視をやめる（スクロール戻しても消えないように）
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発火
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });
}