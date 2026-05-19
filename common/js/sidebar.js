/**
 * sidebar.js — Hotel PMS 공통 사이드바
 * 모든 페이지에서 <script src="../common/js/sidebar.js"></script> 한 줄로 사용
 *
 * 사용법:
 *   1. <body> 안 최상단에 <div id="sidebar-root"></div> 추가
 *   2. 이 스크립트를 로드
 *   3. 기존 <aside class="sidebar">...</aside> 와 사이드바 <script> 블록 제거
 */

(function () {
    // ─── 현재 페이지 위치 감지 → 상대 경로 prefix 계산 ─────────
    // dashboard/dashboard.html        → base = ''
    // dashboard/frontdesk/checkin.html → base = '../'
    const _pathParts = window.location.pathname.split('/').filter(Boolean);
    const _filename  = _pathParts[_pathParts.length - 1] || '';
    const _parentDir = _pathParts[_pathParts.length - 2] || '';
    // 바로 dashboard 폴더 아래에 있으면 prefix 없음, 한 단계 깊으면 '../'
    const BASE = (_parentDir === 'dashboard' || _parentDir === '') ? '' : '../';

    // ─── 메뉴 정의 (dashboard/ 기준 상대경로) ────────────────────
    const MENU = [
        {
            group: 'Main',
            items: [
                { icon: 'fa-gauge-high', label: '대시보드', href: BASE + '/hotel/dashboard.html' },
            ]
        },
        {
            group: 'Front Desk',
            items: [
                { icon: 'fa-calendar-days',    label: '예약 타임라인', href: BASE + '/hotel/frontdesk/reservation-timeline.html' },
                { icon: 'fa-list-check',       label: '예약 목록',     href: BASE + '/hotel/frontdesk/reservation-list.html' },
                { icon: 'fa-right-to-bracket', label: '체크인/아웃',   href: BASE + '/hotel/frontdesk/checkin.html' },
            ]
        },
        {
            group: 'Guest & CRM',
            items: [
                { icon: 'fa-users', label: '투숙객 관리', href: BASE + '/hotel/crm/guests.html' },
                { icon: 'fa-crown', label: 'VIP 멤버십',  href: BASE + '/hotel/crm/membership.html' },
            ]
        },
        {
            group: 'Operations',
            items: [
                {
                    icon: 'fa-bed', label: '객실 관리', id: 'rooms',
                    mainHref: '#',
                    children: [
                        { label: '객실 현황/목록', href: '#' },
                        { label: '객실/유형 등록', href: '#' },
                    ]
                },
                { icon: 'fa-tags',  label: '요금 캘린더', href: '#' },
                { icon: 'fa-broom', label: '하우스키핑',  href: '#', badge: '5' },
                {
                    icon: 'fa-file-invoice-dollar', label: '통합 정산', id: 'folio',
                    mainHref: '#',
                    children: [
                        { label: '정산 목록', href: '#' },
                        { label: '매출 분석', href: '#' },
                    ]
                },
                {
                    icon: 'fa-concierge-bell', label: '부가서비스', id: 'ancillary',
                    mainHref: '#',
                    children: [
                        { label: '룸서비스', href: '#' },
                        { label: '골프장',   href: '#' },
                        { label: '렌트카',   href: '#' },
                    ]
                },
            ]
        },
        {
            group: 'Settings',
            items: [
                { icon: 'fa-gear',        label: '호텔 설정', href: '#' },
                { icon: 'fa-user-shield', label: '직원 관리', href: '#' },
            ]
        },
    ];

    // ─── HTML 생성 ────────────────────────────────────────────
    function buildNavItem(item) {
        if (item.children) {
            const children = item.children.map(c =>
                `<a class="nav-sub-item" href="${c.href}"><span data-i18n-key="${c.label}">${c.label}</span></a>`
            ).join('');
            return `
            <div class="nav-item" data-menu="${item.id}" onclick="location.href='${item.mainHref}'">
                <span><i class="fa-solid ${item.icon}"></i> <span data-i18n-key="${item.label}">${item.label}</span></span>
                <i class="fa-solid fa-chevron-down nav-chevron" onclick="event.stopPropagation(); PMS_Sidebar.toggleSubMenu(this)"></i>
            </div>
            <div class="nav-sub" data-submenu="${item.id}">${children}</div>`;
        }
        const badge = item.badge ? ` <span class="badge-nav">${item.badge}</span>` : '';
        return `<a class="nav-item" href="${item.href}"><i class="fa-solid ${item.icon}"></i> <span data-i18n-key="${item.label}">${item.label}</span>${badge}</a>`;
    }

    function buildSidebar() {
        const groups = MENU.map(g => `
        <div class="nav-group">
            <div class="nav-group-label" data-i18n-key="${g.group}">${g.group}</div>
            ${g.items.map(buildNavItem).join('')}
        </div>`).join('');

        return `
<div class="sidebar-overlay" onclick="PMS_Sidebar.toggleMenu()"></div>
<aside class="sidebar">
    <div class="sidebar-logo">
        <div class="logo-icon">H</div>
        <div>
            <div class="logo-text">HOTEL PMS</div>
            <div class="logo-sub">Management System</div>
        </div>
    </div>
    <nav class="sidebar-nav">${groups}</nav>
    <div class="sidebar-bottom">
        <div class="sidebar-user">
            <div class="user-avatar">NK</div>
            <div class="user-info">
                <div class="user-name">Nguyen Kim</div>
                <div class="user-role">Front Manager</div>
            </div>
        </div>
    </div>
</aside>`;
    }

    // ─── DOM 주입 ─────────────────────────────────────────────
    function inject() {
        const root = document.getElementById('sidebar-root');
        if (!root) {
            // sidebar-root 없으면 body 맨 앞에 div 만들어서 삽입
            const div = document.createElement('div');
            div.id = 'sidebar-root';
            document.body.insertBefore(div, document.body.firstChild);
            div.outerHTML = buildSidebar();
        } else {
            root.outerHTML = buildSidebar();
        }
    }

    // ─── 활성 링크 처리 ──────────────────────────────────────
    function updateActiveSidebarLinks() {
        const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
        const currentHash = window.location.hash;

        document.querySelectorAll('.sidebar-nav a.nav-item, .sidebar-nav a.nav-sub-item').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const hrefParts = href.split('/');
            const hrefFileAndHash = hrefParts[hrefParts.length - 1];
            const hrefFile = hrefFileAndHash.split('#')[0];
            const hrefHash = hrefFileAndHash.includes('#') ? '#' + hrefFileAndHash.split('#')[1] : '';

            let isMatch = false;
            if (hrefFile === currentPath) {
                if (currentHash) {
                    if (hrefHash === currentHash) isMatch = true;
                } else {
                    if (!hrefHash || hrefHash === '#tab-basic') isMatch = true;
                }
            }

            if (isMatch) {
                link.classList.add('active');
                const sub = link.closest('.nav-sub');
                if (sub) {
                    sub.classList.add('show');
                    sub.previousElementSibling.classList.add('expanded', 'active');
                    const parentMenuId = sub.previousElementSibling.getAttribute('data-menu');
                    if (parentMenuId) localStorage.setItem('menu_expanded_' + parentMenuId, 'true');
                }
            }
        });

        document.querySelectorAll('.sidebar-nav div.nav-item[onclick]').forEach(div => {
            div.classList.remove('active');
            if (div.getAttribute('onclick').includes(currentPath)) div.classList.add('active');
        });
    }

    // ─── 공개 API ─────────────────────────────────────────────
    window.PMS_Sidebar = {
        toggleMenu() {
            document.querySelector('.sidebar').classList.toggle('active');
            document.querySelector('.sidebar-overlay').classList.toggle('active');
        },

        toggleSubMenu(iconElement) {
            const parentItem = iconElement.parentElement;
            const subMenu = parentItem.nextElementSibling;
            const menuId = parentItem.getAttribute('data-menu');

            // Accordion: 다른 메뉴 닫기
            document.querySelectorAll('.nav-item[data-menu]').forEach(item => {
                if (item !== parentItem) {
                    item.classList.remove('expanded');
                    const sub = item.nextElementSibling;
                    if (sub) sub.classList.remove('show');
                    const id = item.getAttribute('data-menu');
                    if (id) localStorage.setItem('menu_expanded_' + id, 'false');
                }
            });

            parentItem.classList.toggle('expanded');
            subMenu.classList.toggle('show');
            if (menuId) localStorage.setItem('menu_expanded_' + menuId, parentItem.classList.contains('expanded'));
        },

        init() {
            inject();

            // localStorage 상태 복원
            document.querySelectorAll('.nav-item[data-menu]').forEach(item => {
                const menuId = item.getAttribute('data-menu');
                if (localStorage.getItem('menu_expanded_' + menuId) === 'true') {
                    item.classList.add('expanded');
                    const sub = item.nextElementSibling;
                    if (sub) sub.classList.add('show');
                }
            });

            updateActiveSidebarLinks();

            // 최상위 링크 클릭 시 아코디언 전부 닫기
            document.querySelectorAll('.sidebar-nav a.nav-item').forEach(link => {
                link.addEventListener('click', () => {
                    document.querySelectorAll('.nav-item[data-menu]').forEach(item => {
                        const id = item.getAttribute('data-menu');
                        if (id) localStorage.setItem('menu_expanded_' + id, 'false');
                    });
                });
            });

            window.addEventListener('hashchange', updateActiveSidebarLinks);
        }
    };

    // 하위 호환: 기존 인라인 onclick="toggleMenu()" 지원
    window.toggleMenu = () => PMS_Sidebar.toggleMenu();

    // DOM 준비되면 자동 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => PMS_Sidebar.init());
    } else {
        PMS_Sidebar.init();
    }
})();
