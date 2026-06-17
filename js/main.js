// Smooth scroll for contact links
function initSmoothScroll() {
    document.querySelectorAll('a[href="#footer"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const footer = document.getElementById('footer');
            if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Smooth scroll for CTA button
function initCTAScroll() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.getElementById('what-we-do');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// Order buttons redirect to order page
function initOrderButtons() {
    document.querySelectorAll('.free-trial-btn, .create-order-btn, .pricing-btn, .pe-cta .cta-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'order.html';
        });
    });
}

// Sticky header on scroll
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let isScrolled = false;
    let ticking = false;

    function updateHeader() {
        const scrolled = window.scrollY > 100;
        if (scrolled !== isScrolled) {
            header.classList.toggle('header-scrolled', scrolled);
            isScrolled = scrolled;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Before/After Slider — add/remove document listeners per drag session (#4 fix)
function initBeforeAfterSliders() {
    document.querySelectorAll('.before-after-image').forEach(slider => {
        const beforeImage = slider.querySelector('.before-image');
        const afterImage  = slider.querySelector('.after-image');
        const handle      = slider.querySelector('.slider-handle');
        const line        = slider.querySelector('.slider-line');

        if (!beforeImage || !afterImage || !handle || !line) return;

        let isDragging = false;

        function updateSlider(percentage) {
            beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
            afterImage.style.clipPath  = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
            handle.style.left = `${percentage}%`;
            line.style.left   = `${percentage}%`;
        }

        function getX(e) {
            return e.touches ? e.touches[0].clientX : e.clientX;
        }

        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            const rect = slider.getBoundingClientRect();
            const pct  = Math.max(0, Math.min(100, ((getX(e) - rect.left) / rect.width) * 100));
            updateSlider(pct);
        }

        function stopDrag() {
            if (!isDragging) return;
            isDragging = false;
            handle.style.cursor = 'grab';
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup',   stopDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend',  stopDrag);
        }

        handle.addEventListener('mousedown', e => {
            isDragging = true;
            handle.style.cursor = 'grabbing';
            e.preventDefault();
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup',   stopDrag);
        });

        handle.addEventListener('touchstart', e => {
            isDragging = true;
            e.preventDefault();
            document.addEventListener('touchmove', drag,     { passive: false });
            document.addEventListener('touchend',  stopDrag);
        }, { passive: false });

        slider.addEventListener('click', function(e) {
            if (isDragging) return;
            const rect = slider.getBoundingClientRect();
            updateSlider(((e.clientX - rect.left) / rect.width) * 100);
        });

        updateSlider(50);
    });
}

// Multi-image slider used on service detail pages
function initMultiSlider() {
    const slider = document.querySelector('.pe-multi-slider');
    if (!slider) return;

    const sk = document.getElementById('peTopSkeleton');
    if (sk) sk.style.display = 'none';
    slider.classList.remove('is-hidden');

    const viewport = slider.querySelector('.pe-viewport');
    const track    = slider.querySelector('.pe-track');
    let slides     = Array.from(track.querySelectorAll('img'));
    if (!viewport || !track || slides.length === 0) return;

    const visible = Math.max(1, parseInt(slider.getAttribute('data-visible')) || 3);
    let index = 0;
    const GAP = 16;

    const alreadyCloned = track.getAttribute('data-cloned') === 'true';
    if (!alreadyCloned) {
        slides.slice(-visible).map(n => n.cloneNode(true)).forEach(n => track.insertBefore(n, track.firstChild));
        slides.slice(0, visible).map(n => n.cloneNode(true)).forEach(n => track.appendChild(n));
        track.setAttribute('data-cloned', 'true');
    }
    slides = Array.from(track.querySelectorAll('img'));
    const logicalCount = slides.length - visible * 2;

    function updateWidths() {
        const perWidth = (viewport.clientWidth - GAP * (visible - 1)) / visible;
        slides.forEach(img => { img.style.width = perWidth + 'px'; });
    }

    function goTo(newIndex) {
        index = newIndex;
        const sw = slides[0].clientWidth + GAP;
        track.style.transition = 'transform 320ms ease';
        track.style.transform  = `translate3d(${-(index + visible) * sw}px,0,0)`;
    }

    function jumpWithoutAnim(i) {
        const sw = slides[0].clientWidth + GAP;
        track.style.transition = 'none';
        track.style.transform  = `translate3d(${-(i + visible) * sw}px,0,0)`;
    }

    function normalize() {
        if (index < 0) { index = logicalCount - 1; jumpWithoutAnim(index); }
        else if (index >= logicalCount) { index = 0; jumpWithoutAnim(index); }
    }

    slider.querySelector('.pe-prev')?.addEventListener('click', () => goTo(index - 1));
    slider.querySelector('.pe-next')?.addEventListener('click', () => goTo(index + 1));
    track.addEventListener('transitionend', normalize);
    window.addEventListener('resize', () => { updateWidths(); goTo(index); });

    const doAutoplay  = slider.getAttribute('data-autoplay') === 'true';
    const intervalMs  = parseInt(slider.getAttribute('data-interval')) || 3500;
    let timer;
    function start() { if (doAutoplay) { stop(); timer = setInterval(() => goTo(index + 1), intervalMs); } }
    function stop()  { clearInterval(timer); }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    new IntersectionObserver(entries => {
        entries.forEach(e => { e.isIntersecting ? start() : stop(); });
    }, { threshold: 0.1 }).observe(slider);

    updateWidths();
    jumpWithoutAnim(0);
    requestAnimationFrame(() => goTo(0));
    start();
}

// One-time lazy loader using IntersectionObserver
function initLazyLoader() {
    const lazyImgs = Array.from(document.querySelectorAll('img[data-src]'));
    if (lazyImgs.length === 0) return;

    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src && !img.dataset.loaded) {
                img.classList.add('progressive-img');
                requestAnimationFrame(() => { img.src = src; });
                img.decoding = 'async';
                img.addEventListener('load', () => {
                    img.dataset.loaded = 'true';
                    img.classList.add('is-loaded');
                }, { once: true });
            }
            observer.unobserve(img);
        });
    }, { rootMargin: '200px 0px' });

    lazyImgs.forEach(img => io.observe(img));
}

// Gallery (used on pages with thumbnail gallery)
function initializeGallery() {
    const mainImage = document.getElementById('mainGalleryImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!mainImage || thumbnails.length === 0) return;

    let currentIndex = 0;
    const images = Array.from(thumbnails).map(t => t.dataset.main);

    function updateMainImage()      { if (images[currentIndex]) mainImage.src = images[currentIndex]; }
    function updateActiveThumbnail() {
        thumbnails.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
    }

    thumbnails.forEach((thumb, i) => {
        thumb.addEventListener('click', () => { currentIndex = i; updateMainImage(); updateActiveThumbnail(); });
    });

    document.getElementById('prevMainBtn')?.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        updateMainImage(); updateActiveThumbnail();
    });
    document.getElementById('nextMainBtn')?.addEventListener('click', () => {
        currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        updateMainImage(); updateActiveThumbnail();
    });

    const thumbsContainer = document.getElementById('thumbnailsContainer');
    document.getElementById('nextThumbBtn')?.addEventListener('click', () => {
        thumbsContainer?.scrollBy({ left: 150, behavior: 'smooth' });
    });

    let autoPlay;
    function startAutoPlay() {
        autoPlay = setInterval(() => {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateMainImage(); updateActiveThumbnail();
        }, 5000);
    }
    function stopAutoPlay() { clearInterval(autoPlay); }

    startAutoPlay();
    const galleryMain = document.querySelector('.gallery-main-image');
    if (galleryMain) {
        galleryMain.addEventListener('mouseenter', stopAutoPlay);
        galleryMain.addEventListener('mouseleave', startAutoPlay);
    }
}

// Services dropdown link handler
function initServicesDropdown() {
    document.querySelectorAll('.dropdown-toggle[href="services.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'services.html';
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const nav    = document.getElementById('navigation');
    if (!toggle || !nav) return;

    function closeMenu() {
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.querySelector('i').className = 'fas fa-bars';
    }

    toggle.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('active');
        toggle.classList.toggle('active', isOpen);
        toggle.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    nav.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) closeMenu();
    });
}

// Single DOMContentLoaded — all init calls here (#2 fix)
document.addEventListener('DOMContentLoaded', function() {
    initBeforeAfterSliders();
    initLazyLoader();
    initStickyHeader();
    initializeGallery();
    initServicesDropdown();
    initSmoothScroll();
    initCTAScroll();
    initOrderButtons();
    initMobileMenu();

    if (document.querySelector('.pe-multi-slider')) {
        initMultiSlider();
    }
    // portfolio page is handled entirely by portfolio.js
});
