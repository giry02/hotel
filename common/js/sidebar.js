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
    const _parentDir = _pathParts[_pathParts.length - 2] || '';
    // 알려진 서브폴더에 있으면 한 단계 위로 — 그 외(루트/repo명 등)는 그대로
    const _subDirs = ['frontdesk', 'operations', 'crm', 'settings'];
    const BASE = _subDirs.includes(_parentDir) ? '../' : '';

    // 동적 스크립트 로드 후 DataReady 이벤트 발생 (document.write 안티패턴 제거)
    const scriptsToLoad = [
        `${BASE}common/data/ancillaries.js`,
        `${BASE}common/data/guests.js`,
        `${BASE}common/data/rooms.js`,
        `${BASE}common/data/reservations.js`,
        `${BASE}common/data/orders.js`,
        `${BASE}common/data/housekeeping.js`
    ];
    let loadedCount = 0;
    scriptsToLoad.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedCount++;
            if(loadedCount === scriptsToLoad.length) {
                window.dispatchEvent(new Event('DataReady'));
            }
        };
        document.head.appendChild(script);
    });

    // ─── 사용자 역할 로드 (기본값 admin) ─────────
    window.currentUserRole = localStorage.getItem('currentUserRole') || 'admin';

    // ─── 메뉴 정의 (dashboard/ 기준 상대경로) ────────────────────
    const MENU = [
        {
            group: 'Main',
            roles: ['admin', 'manager', 'housekeeper'],
            items: [
                { icon: 'fa-gauge-high', label: '대시보드', href: BASE + 'dashboard.html' },
            ]
        },
        {
            group: 'Front Desk',
            roles: ['admin', 'manager'],
            items: [
                { icon: 'fa-calendar-days',    label: '예약 타임라인', href: BASE + 'frontdesk/reservation-timeline.html' },
                { icon: 'fa-list-check',       label: '예약 목록',     href: BASE + 'frontdesk/reservation-list.html' },
                { icon: 'fa-right-to-bracket', label: '체크인/아웃',   href: BASE + 'frontdesk/checkin.html' },
            ]
        },
        {
            group: 'Guest & CRM',
            roles: ['admin', 'manager'],
            items: [
                { icon: 'fa-users', label: '투숙객 관리', href: BASE + 'crm/guests.html' },
                { icon: 'fa-crown', label: 'VIP 멤버십',  href: BASE + 'crm/membership.html' },
            ]
        },
        {
            group: 'Operations',
            roles: ['admin', 'manager', 'housekeeper'],
            items: [
                {
                    icon: 'fa-bed', label: '객실 관리', id: 'rooms', roles: ['admin', 'manager'],
                    mainHref: BASE + 'operations/rooms.html',
                    children: [
                        { label: '객실 현황/목록', href: BASE + 'operations/rooms.html' },
                        { label: '객실/유형 등록', href: BASE + 'operations/room-setup.html' },
                    ]
                },
                { icon: 'fa-tags',  label: '요금 캘린더', href: BASE + 'operations/rates.html', roles: ['admin', 'manager'] },
                { icon: 'fa-broom', label: '하우스키핑',  href: BASE + 'operations/housekeeping.html', badge: '5', roles: ['admin', 'manager', 'housekeeper'] },
                {
                    icon: 'fa-file-invoice-dollar', label: '통합 정산', id: 'folio', roles: ['admin', 'manager'],
                    mainHref: BASE + 'operations/folio.html',
                    children: [
                        { label: '정산 목록', href: BASE + 'operations/folio.html' },
                        { label: '매출 분석', href: BASE + 'operations/folio-chart.html' },
                    ]
                },
                {
                    icon: 'fa-concierge-bell', label: '부가서비스', id: 'ancillary', roles: ['admin', 'manager'],
                    mainHref: BASE + 'operations/room-service.html',
                    children: [
                        { label: '룸서비스', href: BASE + 'operations/room-service.html' },
                        { label: '골프장',   href: BASE + 'operations/golf.html' },
                        { label: '렌트카',   href: BASE + 'operations/rentacar.html' },
                    ]
                },
            ]
        },
        {
            group: 'Settings',
            roles: ['admin', 'manager'],
            items: [
                { icon: 'fa-gear',        label: '호텔 설정', href: BASE + 'settings/settings.html' },
                { icon: 'fa-user-shield', label: '직원 관리', href: BASE + 'settings/staff.html' },
                { icon: 'fa-credit-card', label: '요금 및 결제', href: BASE + 'settings/billing.html' },
                { icon: 'fa-bullhorn',    label: '공지사항',   href: BASE + 'settings/notices.html' },
                { icon: 'fa-headset',     label: '고객지원',   href: BASE + 'settings/support.html' }
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
        const userRole = window.currentUserRole;
        const filteredGroups = MENU.map(g => {
            if (g.roles && !g.roles.includes(userRole)) return null;
            const validItems = g.items.filter(item => !item.roles || item.roles.includes(userRole));
            if (validItems.length === 0) return null;
            return { group: g.group, items: validItems };
        }).filter(Boolean);

        const groups = filteredGroups.map(g => `
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
        <div class="sidebar-user" style="display:flex;align-items:center;justify-content:space-between;width:100%">
            <div style="display:flex;align-items:center;gap:12px">
                <div class="user-avatar">NK</div>
                <div class="user-info">
                    <div class="user-name">Nguyen Kim</div>
                    <div class="user-role" style="text-transform:uppercase">${userRole}</div>
                </div>
            </div>
            <select style="width:70px;padding:2px 4px;font-size:0.75rem;border-radius:4px;border:1px solid #ccc;color:#333" onchange="localStorage.setItem('currentUserRole', this.value); location.reload()">
                <option value="admin" ${userRole==='admin'?'selected':''}>Admin</option>
                <option value="manager" ${userRole==='manager'?'selected':''}>Manger</option>
                <option value="housekeeper" ${userRole==='housekeeper'?'selected':''}>HK</option>
            </select>
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
