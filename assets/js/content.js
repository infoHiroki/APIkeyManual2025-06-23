// 動的コンテンツ読み込み用 JavaScript
// index.html の動的コンテンツ機能をサポート

document.addEventListener('DOMContentLoaded', function() {
    // 既存のコンテンツがある場合は何もしない（静的コンテンツ優先）
    const mainContent = document.getElementById('main-content');
    if (mainContent && mainContent.innerHTML.trim()) {
        return;
    }
    
    // フォールバック: 基本的なエラーハンドリング
    console.log('Content.js loaded - static content mode');
});