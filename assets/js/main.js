// 医療機関向け API キー管理マニュアル - メインJavaScript

class ManualApp {
    constructor() {
        this.currentSection = 'intro';
        this.init();
    }

    init() {
        // イベントリスナーの設定
        this.setupEventListeners();
        
        // 初期状態の設定
        this.setupInitialState();
        
        
        // 読み込み進行度の初期化
        this.updateProgress();
    }

    setupEventListeners() {

        // 印刷機能
        const printBtn = document.getElementById('print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.printManual());
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