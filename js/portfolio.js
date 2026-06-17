// Portfolio Gallery with Lazy Loading and Pagination
function initPortfolioOptimized() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!portfolioGrid) return;

    const portfolioImages = [
        // Day To Dusk
        { src: 'images/Sample Lotus Foto/Day To Dusk/1.jpg',  category: 'daytodusk', title: 'Day To Dusk Sample 1' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/11.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 2' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/2.JPG',  category: 'daytodusk', title: 'Day To Dusk Sample 3' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/22.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 4' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/3.JPG',  category: 'daytodusk', title: 'Day To Dusk Sample 5' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/33.jpg', category: 'daytodusk', title: 'Day To Dusk Sample 6' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/4.jpg',  category: 'daytodusk', title: 'Day To Dusk Sample 7' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/5.jpg',  category: 'daytodusk', title: 'Day To Dusk Sample 8' },
        { src: 'images/Sample Lotus Foto/Day To Dusk/6.jpg',  category: 'daytodusk', title: 'Day To Dusk Sample 9' },

        // HDR Blending — folder 1
        { src: 'images/Sample Lotus Foto/HDR Blending/1/DSC00287.jpg', category: 'hdr', title: 'HDR Blending Sample 1' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5121.jpg', category: 'hdr', title: 'HDR Blending Sample 2' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5129.jpg', category: 'hdr', title: 'HDR Blending Sample 3' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5164.jpg', category: 'hdr', title: 'HDR Blending Sample 4' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5192.jpg', category: 'hdr', title: 'HDR Blending Sample 5' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5197.jpg', category: 'hdr', title: 'HDR Blending Sample 6' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5217.jpg', category: 'hdr', title: 'HDR Blending Sample 7' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5230.jpg', category: 'hdr', title: 'HDR Blending Sample 8' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5252.jpg', category: 'hdr', title: 'HDR Blending Sample 9' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5813.jpg', category: 'hdr', title: 'HDR Blending Sample 10' },
        { src: 'images/Sample Lotus Foto/HDR Blending/1/ET6A5819.jpg', category: 'hdr', title: 'HDR Blending Sample 11' },

        // HDR Blending — folder 2
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05851.jpg', category: 'hdr', title: 'HDR Blending Sample 12' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05854.jpg', category: 'hdr', title: 'HDR Blending Sample 13' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05860.jpg', category: 'hdr', title: 'HDR Blending Sample 14' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05866.jpg', category: 'hdr', title: 'HDR Blending Sample 15' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05872.jpg', category: 'hdr', title: 'HDR Blending Sample 16' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05875.jpg', category: 'hdr', title: 'HDR Blending Sample 17' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05884.jpg', category: 'hdr', title: 'HDR Blending Sample 18' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05887.jpg', category: 'hdr', title: 'HDR Blending Sample 19' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05890.jpg', category: 'hdr', title: 'HDR Blending Sample 20' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05895.jpg', category: 'hdr', title: 'HDR Blending Sample 21' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05901.jpg', category: 'hdr', title: 'HDR Blending Sample 22' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05904.jpg', category: 'hdr', title: 'HDR Blending Sample 23' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05908.jpg', category: 'hdr', title: 'HDR Blending Sample 24' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05935.jpg', category: 'hdr', title: 'HDR Blending Sample 25' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC05970.jpg', category: 'hdr', title: 'HDR Blending Sample 26' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06031.jpg', category: 'hdr', title: 'HDR Blending Sample 27' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06034.jpg', category: 'hdr', title: 'HDR Blending Sample 28' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06037.jpg', category: 'hdr', title: 'HDR Blending Sample 29' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06040.jpg', category: 'hdr', title: 'HDR Blending Sample 30' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06043.jpg', category: 'hdr', title: 'HDR Blending Sample 31' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06046.jpg', category: 'hdr', title: 'HDR Blending Sample 32' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06049.jpg', category: 'hdr', title: 'HDR Blending Sample 33' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06052.jpg', category: 'hdr', title: 'HDR Blending Sample 34' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06055.jpg', category: 'hdr', title: 'HDR Blending Sample 35' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06058.jpg', category: 'hdr', title: 'HDR Blending Sample 36' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06061.jpg', category: 'hdr', title: 'HDR Blending Sample 37' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06064.jpg', category: 'hdr', title: 'HDR Blending Sample 38' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06067.jpg', category: 'hdr', title: 'HDR Blending Sample 39' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06070.jpg', category: 'hdr', title: 'HDR Blending Sample 40' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06073.jpg', category: 'hdr', title: 'HDR Blending Sample 41' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06076.jpg', category: 'hdr', title: 'HDR Blending Sample 42' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06079.jpg', category: 'hdr', title: 'HDR Blending Sample 43' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06084.jpg', category: 'hdr', title: 'HDR Blending Sample 44' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06087.jpg', category: 'hdr', title: 'HDR Blending Sample 45' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06090.jpg', category: 'hdr', title: 'HDR Blending Sample 46' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06093.jpg', category: 'hdr', title: 'HDR Blending Sample 47' },
        { src: 'images/Sample Lotus Foto/HDR Blending/2/DSC06097.jpg', category: 'hdr', title: 'HDR Blending Sample 48' },

        // Virtual Staging
        { src: 'images/Sample Lotus Foto/Virtual Staging/1before.jpg',  category: 'staging', title: 'Virtual Staging Before 1' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/1after.jpg',   category: 'staging', title: 'Virtual Staging After 1' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/2before.jpg',  category: 'staging', title: 'Virtual Staging Before 2' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/2after.jpg',   category: 'staging', title: 'Virtual Staging After 2' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/3before.jpg',  category: 'staging', title: 'Virtual Staging Before 3' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/3after.jpg',   category: 'staging', title: 'Virtual Staging After 3' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/4before.jpg',  category: 'staging', title: 'Virtual Staging Before 4' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/4after.jpg',   category: 'staging', title: 'Virtual Staging After 4' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/5after.jpg',   category: 'staging', title: 'Virtual Staging After 5' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/6after.jpg',   category: 'staging', title: 'Virtual Staging After 6' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/7after.jpg',   category: 'staging', title: 'Virtual Staging After 7' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/8before.jpg',  category: 'staging', title: 'Virtual Staging Before 8' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/8after.jpg',   category: 'staging', title: 'Virtual Staging After 8' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/9after.jpg',   category: 'staging', title: 'Virtual Staging After 9' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/10after.jpg',  category: 'staging', title: 'Virtual Staging After 10' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/11before.jpg', category: 'staging', title: 'Virtual Staging Before 11' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/11after.jpg',  category: 'staging', title: 'Virtual Staging After 11' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/12after.jpg',  category: 'staging', title: 'Virtual Staging After 12' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/13after.jpg',  category: 'staging', title: 'Virtual Staging After 13' },
        { src: 'images/Sample Lotus Foto/Virtual Staging/14after.jpg',  category: 'staging', title: 'Virtual Staging After 14' },

        // Virtual Renovation
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122303_.jpg',       category: 'renovation', title: 'Virtual Renovation Sample 1' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122303.jpg',         category: 'renovation', title: 'Virtual Renovation Sample 2' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122310_.jpg',        category: 'renovation', title: 'Virtual Renovation Sample 3' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122310.jpg',         category: 'renovation', title: 'Virtual Renovation Sample 4' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122323_Room2_.jpg',  category: 'renovation', title: 'Virtual Renovation Sample 5' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/01122323_Room2.jpg',   category: 'renovation', title: 'Virtual Renovation Sample 6' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-1bf.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 7' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-2bf.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 8' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-3bf.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 9' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-4bf.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 10' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/1-6bf.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 11' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.1.jpg',              category: 'renovation', title: 'Virtual Renovation Sample 12' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/2.jpg',                category: 'renovation', title: 'Virtual Renovation Sample 13' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/37_compressed.jpg',    category: 'renovation', title: 'Virtual Renovation Sample 14' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/b1-1.jpg',             category: 'renovation', title: 'Virtual Renovation Sample 15' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/b1.jpg',               category: 'renovation', title: 'Virtual Renovation Sample 16' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/bath1.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 17' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/bath2.jpg',            category: 'renovation', title: 'Virtual Renovation Sample 18' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC02106-Edit copy_1.jpg', category: 'renovation', title: 'Virtual Renovation Sample 19' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC02106-Edit copy.jpg',   category: 'renovation', title: 'Virtual Renovation Sample 20' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09914_1.jpg',       category: 'renovation', title: 'Virtual Renovation Sample 21' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09914.jpg',         category: 'renovation', title: 'Virtual Renovation Sample 22' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09920_1.jpg',       category: 'renovation', title: 'Virtual Renovation Sample 23' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09920.jpg',         category: 'renovation', title: 'Virtual Renovation Sample 24' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09921_1.jpg',       category: 'renovation', title: 'Virtual Renovation Sample 25' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/DSC09921.jpg',         category: 'renovation', title: 'Virtual Renovation Sample 26' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str.jpg',              category: 'renovation', title: 'Virtual Renovation Sample 27' },
        { src: 'images/Sample Lotus Foto/Virtual Renovation/str1.jpg',             category: 'renovation', title: 'Virtual Renovation Sample 28' },

        // Item Removal
        { src: 'images/Sample Lotus Foto/Item Removal/1.jpg',  category: 'removal', title: 'Item Removal Sample 1' },
        { src: 'images/Sample Lotus Foto/Item Removal/2.jpg',  category: 'removal', title: 'Item Removal Sample 2' },
        { src: 'images/Sample Lotus Foto/Item Removal/3.jpg',  category: 'removal', title: 'Item Removal Sample 3' },
        { src: 'images/Sample Lotus Foto/Item Removal/4.jpg',  category: 'removal', title: 'Item Removal Sample 4' },
        { src: 'images/Sample Lotus Foto/Item Removal/5.jpg',  category: 'removal', title: 'Item Removal Sample 5' },
        { src: 'images/Sample Lotus Foto/Item Removal/6.jpg',  category: 'removal', title: 'Item Removal Sample 6' },
        { src: 'images/Sample Lotus Foto/Item Removal/7.jpg',  category: 'removal', title: 'Item Removal Sample 7' },
        { src: 'images/Sample Lotus Foto/Item Removal/8.jpg',  category: 'removal', title: 'Item Removal Sample 8' },
        { src: 'images/Sample Lotus Foto/Item Removal/9.jpg',  category: 'removal', title: 'Item Removal Sample 9' },
        { src: 'images/Sample Lotus Foto/Item Removal/10.jpg', category: 'removal', title: 'Item Removal Sample 10' },
        { src: 'images/Sample Lotus Foto/Item Removal/11.jpg', category: 'removal', title: 'Item Removal Sample 11' },
        { src: 'images/Sample Lotus Foto/Item Removal/12.jpg', category: 'removal', title: 'Item Removal Sample 12' },
        { src: 'images/Sample Lotus Foto/Item Removal/13.jpg', category: 'removal', title: 'Item Removal Sample 13' },
        { src: 'images/Sample Lotus Foto/Item Removal/14.jpg', category: 'removal', title: 'Item Removal Sample 14' },
        { src: 'images/Sample Lotus Foto/Item Removal/15.jpg', category: 'removal', title: 'Item Removal Sample 15' },
        { src: 'images/Sample Lotus Foto/Item Removal/16.jpg', category: 'removal', title: 'Item Removal Sample 16' },
        { src: 'images/Sample Lotus Foto/Item Removal/17.jpg', category: 'removal', title: 'Item Removal Sample 17' },
        { src: 'images/Sample Lotus Foto/Item Removal/18.jpg', category: 'removal', title: 'Item Removal Sample 18' }
    ];

    let currentFilter = 'all';
    let currentPage   = 1;
    let totalPages    = 1;
    let isLoading     = false;
    const imagesPerPage = 8;

    // IntersectionObserver for lazy loading (#5 fix)
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('is-loaded');
            }
            observer.unobserve(img);
        });
    }, { rootMargin: '100px 0px', threshold: 0.1 });

    // Render portfolio with lazy-loaded images (#5 fix — use data-src, not src)
    function renderPortfolio(filter = 'all', page = 1) {
        if (isLoading) return;
        isLoading = true;

        portfolioGrid.innerHTML = '';

        const filtered = filter === 'all'
            ? portfolioImages
            : portfolioImages.filter(img => img.category === filter);

        totalPages  = Math.ceil(filtered.length / imagesPerPage);
        currentPage = Math.max(1, Math.min(page, totalPages));

        const slice = filtered.slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage);

        requestAnimationFrame(() => {
            const fragment = document.createDocumentFragment();

            slice.forEach(image => {
                const item = document.createElement('div');
                item.className = 'portfolio-item';
                item.dataset.category = image.category;

                const img = document.createElement('img');
                img.dataset.src = image.src;    // data-src — observer will swap in
                img.alt = image.title;
                img.decoding = 'async';

                const overlay = document.createElement('div');
                overlay.className = 'portfolio-overlay';
                overlay.innerHTML = '<i class="fas fa-search-plus"></i>';

                item.appendChild(img);
                item.appendChild(overlay);
                item.addEventListener('click', () => openPortfolioModal(image.src, image.title));

                fragment.appendChild(item);
                imageObserver.observe(img);
            });

            portfolioGrid.appendChild(fragment);
            updatePaginationUI();
            isLoading = false;
        });
    }

    // Filter buttons with debounce
    let filterTimeout;
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            clearTimeout(filterTimeout);
            filterTimeout = setTimeout(() => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.getAttribute('data-filter');
                renderPortfolio(currentFilter, 1);
            }, 100);
        });
    });

    // Change page
    function changePage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        renderPortfolio(currentFilter, page);
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }

    // Pagination UI built with DOM methods — no inline onclick (#8 fix)
    function updatePaginationUI() {
        let container = document.getElementById('paginationContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'paginationContainer';
            container.className = 'pagination-container';
            portfolioGrid.parentNode.appendChild(container);
        }

        container.innerHTML = '';

        if (totalPages <= 1) {
            container.style.display = 'none';
            return;
        }
        container.style.display = 'flex';

        function makeBtn(label, page, extraClass = '', disabled = false) {
            const btn = document.createElement('button');
            btn.className = ('pagination-btn ' + extraClass).trim();
            btn.innerHTML = label;
            if (disabled) {
                btn.classList.add('disabled');
                btn.disabled = true;
            } else {
                btn.addEventListener('click', () => changePage(page));
            }
            return btn;
        }

        // Previous
        container.appendChild(makeBtn('<i class="fas fa-chevron-left"></i> Previous', currentPage - 1, '', currentPage === 1));

        // Page numbers
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end   = Math.min(totalPages, start + maxVisible - 1);
        if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

        if (start > 1) {
            container.appendChild(makeBtn('1', 1, 'page-number'));
            if (start > 2) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                container.appendChild(dots);
            }
        }

        for (let i = start; i <= end; i++) {
            container.appendChild(makeBtn(String(i), i, 'page-number' + (i === currentPage ? ' active' : ''), i === currentPage));
        }

        if (end < totalPages) {
            if (end < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'pagination-dots';
                dots.textContent = '...';
                container.appendChild(dots);
            }
            container.appendChild(makeBtn(String(totalPages), totalPages, 'page-number'));
        }

        // Next
        container.appendChild(makeBtn('Next <i class="fas fa-chevron-right"></i>', currentPage + 1, '', currentPage === totalPages));

        // Info
        const info = document.createElement('div');
        info.className = 'pagination-info';
        info.textContent = `Page ${currentPage} of ${totalPages}`;
        container.appendChild(info);
    }

    // Portfolio modal
    function openPortfolioModal(src, title) {
        let modal = document.getElementById('portfolioModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'portfolioModal';
            modal.className = 'portfolio-modal';
            modal.innerHTML = `
                <div class="portfolio-modal-content">
                    <span class="portfolio-modal-close">&times;</span>
                    <img src="" alt="">
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('.portfolio-modal-close').addEventListener('click', () => closeModal(modal));
            modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && modal.style.display === 'block') closeModal(modal);
            });
        }

        modal.querySelector('img').src = src;
        modal.querySelector('img').alt = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Initial render
    renderPortfolio();
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('portfolioGrid')) {
        initPortfolioOptimized();
    }
});
