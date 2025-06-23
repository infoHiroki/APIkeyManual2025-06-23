// 医療機関向け API キー管理マニュアル - メインJavaScript

class ManualApp {
    constructor() {
        this.currentSection = 'intro';
        this.searchData = {};
        this.init();
    }

    init() {
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // 初期状態の設定
        this.setupInitialState();
        
        // 検索データの準備
        this.prepareSearchData();
        
        // 読み込み進行度の初期化
        this.updateProgress();
    }

    setupEventListeners() {
        // 検索関連
        const searchBtn = document.getElementById('search-btn');
        const searchOverlay = document.getElementById('search-overlay');
        const closeSearch = document.getElementById('close-search');
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.openSearch());
        }
        
        if (closeSearch) {
            closeSearch.addEventListener('click', () => this.closeSearch());
        }
        
        if (searchOverlay) {
            searchOverlay.addEventListener('click', (e) => {
                if (e.target === searchOverlay) {
                    this.closeSearch();
                }
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });
        }

        // 印刷機能
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printManual());
        }

        // ダークモード切り替え
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // サイドバートグル（モバイル）
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // ナビゲーション
        const navLinks = document.querySelectorAll('.nav-section a[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // スクロール監視
        window.addEventListener('scroll', () => this.updateProgress());
        
        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K で検索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            
            // Escape で検索を閉じる
            if (e.key === 'Escape') {
                this.closeSearch();
            }
        });
        
        // ハッシュ変更の監視
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && this.isValidSection(hash)) {
                this.navigateToSection(hash);
            }
        });
    }

    setupInitialState() {
        // URLハッシュから初期セクションを決定
        const hash = window.location.hash.replace('#', '');
        if (hash && this.isValidSection(hash)) {
            this.currentSection = hash;
        }
        
        // 初期セクションを表示
        this.showSection(this.currentSection);
        
        // ダークモードの初期状態を復元
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateDarkModeButton();
        }
    }

    isValidSection(section) {
        const validSections = [
            'intro', 'quick-start', 'important-notes',
            'llm-basics', 'api-basics', 'medical-considerations',
            'japanese-regulations', 'openai-privacy', 'baa-hipaa',
            'security-overview', 'patient-data-protection', 'api-key-security',
            'api-key-setup', 'practical-usage',
            'quick-reference', 'executive-summary'
        ];
        return validSections.includes(section);
    }

    navigateToSection(sectionId) {
        if (!this.isValidSection(sectionId)) {
            console.warn(`無効なセクション: ${sectionId}`);
            return;
        }
        
        this.currentSection = sectionId;
        this.showSection(sectionId);
        this.updateNavigation();
        this.updateProgress();
        
        // URLハッシュを更新（ただしhashchangeイベントを発火させない）
        history.pushState(null, null, `#${sectionId}`);
        
        // ページトップにスクロール
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showSection(sectionId) {
        // 全てのセクションを非表示
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });

        // 指定されたセクションを表示
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.warn(`セクションが見つかりません: ${sectionId}`);
            // フォールバック: イントロセクションを表示
            const introSection = document.getElementById('intro');
            if (introSection) {
                introSection.classList.add('active');
                this.currentSection = 'intro';
            }
        }
    }

    updateNavigation() {
        // 全てのナビゲーションリンクの active クラスを削除
        const allNavLinks = document.querySelectorAll('.nav-section a');
        allNavLinks.forEach(link => {
            link.classList.remove('active');
        });

        // 現在のセクションに対応するナビゲーションリンクに active クラスを追加
        const currentNavLink = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
    }

    updateProgress() {
        const progressBar = document.getElementById('progress-bar');
        if (!progressBar) return;

        const sections = document.querySelectorAll('.content-section');
        const currentIndex = Array.from(sections).findIndex(section => 
            section.id === this.currentSection
        );
        
        if (currentIndex !== -1) {
            const progress = ((currentIndex + 1) / sections.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }

    // 検索機能
    openSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        
        if (searchOverlay) {
            searchOverlay.classList.add('active');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }

    closeSearch() {
        const searchOverlay = document.getElementById('search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }

    prepareSearchData() {
        // 各セクションの内容を検索用データとして準備
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            const title = section.querySelector('h1')?.textContent || '';
            const content = section.textContent || '';
            
            this.searchData[section.id] = {
                title: title,
                content: content,
                element: section
            };
        });
    }

    performSearch(query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = [];
        const queryLower = query.toLowerCase();

        Object.entries(this.searchData).forEach(([sectionId, data]) => {
            const titleMatch = data.title.toLowerCase().includes(queryLower);
            const contentMatch = data.content.toLowerCase().includes(queryLower);
            
            if (titleMatch || contentMatch) {
                // マッチした部分の前後のテキストを抽出
                const excerpt = this.extractExcerpt(data.content, query);
                
                results.push({
                    sectionId: sectionId,
                    title: data.title,
                    excerpt: excerpt,
                    titleMatch: titleMatch
                });
            }
        });

        // 結果をタイトルマッチを優先してソート
        results.sort((a, b) => {
            if (a.titleMatch && !b.titleMatch) return -1;
            if (!a.titleMatch && b.titleMatch) return 1;
            return 0;
        });

        this.renderSearchResults(results, query);
    }

    extractExcerpt(content, query, maxLength = 150) {
        const queryLower = query.toLowerCase();
        const contentLower = content.toLowerCase();
        const index = contentLower.indexOf(queryLower);
        
        if (index === -1) {
            return content.substring(0, maxLength) + '...';
        }
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 50);
        
        let excerpt = content.substring(start, end);
        
        if (start > 0) excerpt = '...' + excerpt;
        if (end < content.length) excerpt = excerpt + '...';
        
        return excerpt;
    }

    renderSearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><div class="search-result-title">検索結果がありません</div></div>';
            return;
        }

        const html = results.map(result => {
            const highlightedTitle = this.highlightText(result.title, query);
            const highlightedExcerpt = this.highlightText(result.excerpt, query);
            
            return `
                <div class="search-result-item" onclick="app.searchResultClick('${result.sectionId}')">
                    <div class="search-result-title">${highlightedTitle}</div>
                    <div class="search-result-content">${highlightedExcerpt}</div>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = html;
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    searchResultClick(sectionId) {
        this.closeSearch();
        this.navigateToSection(sectionId);
    }

    // 印刷機能
    printManual() {
        // 印刷前に全セクションを表示
        const allSections = document.querySelectorAll('.content-section');
        allSections.forEach(section => {
            section.style.display = 'block';
        });

        window.print();

        // 印刷後に元の表示状態に戻す
        setTimeout(() => {
            allSections.forEach(section => {
                section.style.display = '';
            });
            this.showSection(this.currentSection);
        }, 100);
    }

    // ダークモード切り替え
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        this.updateDarkModeButton();
    }

    updateDarkModeButton() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (!darkModeToggle) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        darkModeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    // サイドバートグル（モバイル）
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('mobile-open');
        }
    }

    // ユーティリティメソッド
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // セクション間ナビゲーション
    goToNextSection() {
        const sections = Array.from(document.querySelectorAll('.content-section'));
        const currentIndex = sections.findIndex(section => section.id === this.currentSection);
        
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            this.navigateToSection(nextSection.id);
        }
    }

    goToPreviousSection() {
        const sections = Array.from(document.querySelectorAll('.content-section'));
        const currentIndex = sections.findIndex(section => section.id === this.currentSection);
        
        if (currentIndex > 0) {
            const previousSection = sections[currentIndex - 1];
            this.navigateToSection(previousSection.id);
        }
    }

    // アクセシビリティ機能
    setupAccessibility() {
        // フォーカス管理
        document.addEventListener('keydown', (e) => {
            // Tab key navigation enhancement
            if (e.key === 'Tab') {
                this.manageFocus(e);
            }
            
            // Arrow key navigation for sections
            if (e.key === 'ArrowLeft' && e.ctrlKey) {
                e.preventDefault();
                this.goToPreviousSection();
            }
            
            if (e.key === 'ArrowRight' && e.ctrlKey) {
                e.preventDefault();
                this.goToNextSection();
            }
        });
    }

    manageFocus(event) {
        // フォーカス可能な要素の管理
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    // エラーハンドリング
    handleError(error, context = '') {
        console.error(`エラーが発生しました ${context}:`, error);
        
        // ユーザーに分かりやすいエラーメッセージを表示
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.style.position = 'fixed';
        errorMessage.style.top = '20px';
        errorMessage.style.right = '20px';
        errorMessage.style.zIndex = '9999';
        errorMessage.innerHTML = `
            <strong>エラー:</strong> ${context || '予期しないエラーが発生しました'}
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: inherit; cursor: pointer;">&times;</button>
        `;
        
        document.body.appendChild(errorMessage);
        
        // 5秒後に自動で削除
        setTimeout(() => {
            if (errorMessage.parentElement) {
                errorMessage.remove();
            }
        }, 5000);
    }
}

// アプリケーションの初期化
let app;

document.addEventListener('DOMContentLoaded', () => {
    try {
        app = new ManualApp();
        
        // グローバルアクセス用
        window.app = app;
        
        console.log('医療機関向け API キー管理マニュアルが正常に読み込まれました');
    } catch (error) {
        console.error('アプリケーション初期化エラー:', error);
        
        // フォールバック: 基本的な機能のみを提供
        const basicFunctionality = {
            navigateToSection: (sectionId) => {
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(s => s.classList.remove('active'));
                
                const target = document.getElementById(sectionId);
                if (target) {
                    target.classList.add('active');
                }
            }
        };
        
        window.app = basicFunctionality;
    }
});

// Service Worker の登録（PWA対応）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}