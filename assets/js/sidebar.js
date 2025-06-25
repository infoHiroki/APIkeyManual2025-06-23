// サイドバー管理クラス
class SidebarManager {
    constructor() {
        this.sections = document.querySelectorAll('.nav-section');
        this.sidebarContent = document.querySelector('.sidebar-content');
        this.init();
    }

    init() {
        // アコーディオン機能の初期化
        this.setupAccordion();
        
        // 保存された状態の復元
        this.restoreState();
        
        // スクロール位置の復元
        this.restoreScrollPosition();
    }

    setupAccordion() {
        this.sections.forEach(section => {
            const header = section.querySelector('.nav-section-header');
            if (header) {
                header.addEventListener('click', () => this.toggleSection(section));
            }
        });
    }

    toggleSection(sectionElement) {
        const isCollapsed = sectionElement.classList.contains('collapsed');
        sectionElement.classList.toggle('collapsed', !isCollapsed);
        
        // 状態を保存
        this.saveState();
        
        // アニメーション効果
        const subsection = sectionElement.querySelector('.nav-subsection');
        if (subsection) {
            if (isCollapsed) {
                // 展開時
                subsection.style.maxHeight = subsection.scrollHeight + 'px';
                setTimeout(() => {
                    subsection.style.maxHeight = '1000px';
                }, 300);
            } else {
                // 折りたたみ時
                subsection.style.maxHeight = subsection.scrollHeight + 'px';
                setTimeout(() => {
                    subsection.style.maxHeight = '0px';
                }, 10);
            }
        }
    }

    saveState() {
        const state = {};
        this.sections.forEach(section => {
            const id = section.dataset.section;
            if (id) {
                state[id] = !section.classList.contains('collapsed');
            }
        });
        localStorage.setItem('sidebar-state', JSON.stringify(state));
    }

    restoreState() {
        try {
            const savedState = localStorage.getItem('sidebar-state');
            if (savedState) {
                const state = JSON.parse(savedState);
                this.sections.forEach(section => {
                    const id = section.dataset.section;
                    if (id && state.hasOwnProperty(id)) {
                        section.classList.toggle('collapsed', !state[id]);
                    }
                });
            }
        } catch (error) {
            console.warn('サイドバー状態の復元に失敗:', error);
        }
    }

    saveScrollPosition() {
        if (this.sidebarContent) {
            const scrollPos = this.sidebarContent.scrollTop;
            localStorage.setItem('sidebar-scroll', scrollPos.toString());
        }
    }

    restoreScrollPosition() {
        try {
            const scrollPos = localStorage.getItem('sidebar-scroll');
            if (scrollPos && this.sidebarContent) {
                this.sidebarContent.scrollTop = parseInt(scrollPos);
            }
        } catch (error) {
            console.warn('スクロール位置の復元に失敗:', error);
        }
    }

    // アクティブページの設定
    setActivePage(pageUrl) {
        // 現在のアクティブリンクを削除
        document.querySelectorAll('.nav-subsection a.active, .nav-subsection-items a.active').forEach(link => {
            link.classList.remove('active');
        });

        // URLからファイル名を抽出
        const fileName = pageUrl.split('/').pop();
        
        // すべてのリンクをチェック
        document.querySelectorAll('.nav-subsection a, .nav-subsection-items a').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkFileName = href.split('/').pop();
                if (fileName === linkFileName) {
                    link.classList.add('active');
                    
                    // 親セクションを展開
                    let parentSection = link.closest('.nav-section');
                    if (parentSection) {
                        parentSection.classList.remove('collapsed');
                    }
                    
                    // スクロールしてアクティブリンクを表示
                    this.scrollToActiveLink(link);
                }
            }
        });
    }

    scrollToActiveLink(link) {
        if (this.sidebarContent && link) {
            const linkRect = link.getBoundingClientRect();
            const sidebarRect = this.sidebarContent.getBoundingClientRect();
            
            if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
                const scrollTop = this.sidebarContent.scrollTop;
                const linkOffsetTop = link.offsetTop;
                const targetScroll = linkOffsetTop - this.sidebarContent.clientHeight / 2;
                
                this.sidebarContent.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            }
        }
    }

    // モバイル用サイドバートグル
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }
}

// ページ読み込み時にサイドバーマネージャーを初期化
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.sidebarManager === 'undefined') {
        window.sidebarManager = new SidebarManager();
        
        // ページ読み込み時にアクティブページを設定
        const currentPath = window.location.pathname;
        window.sidebarManager.setActivePage(currentPath);
        
        // ページ離脱時にスクロール位置を保存
        window.addEventListener('beforeunload', () => {
            window.sidebarManager.saveScrollPosition();
        });
        
        // 定期的にスクロール位置を保存（ブラウザクラッシュ対策）
        setInterval(() => {
            window.sidebarManager.saveScrollPosition();
        }, 5000);
    }
});

// 他のページからのアクセス用グローバル関数
window.setSidebarActivePage = function(pageUrl) {
    if (window.sidebarManager) {
        window.sidebarManager.setActivePage(pageUrl);
    }
};