# セキュリティ監査ガイド - 重点監査項目と監査ツール

## 🎯 重点監査項目

### 患者情報保護

#### データ投入チェック
```
監査手順:

1. 入力データの抽出・確認
   - AIへの入力履歴の全件確認
   - 個人識別情報の含有チェック
   - 匿名化処理の適切性確認

2. 問題データの特定
   検索対象キーワード:
   - 患者氏名（姓・名のパターン）
   - 生年月日（YYYY/MM/DD、YYYY-MM-DD等）
   - 住所情報（都道府県、市区町村名）
   - 診察券番号、カルテ番号
   - 電話番号、メールアドレス

3. 発見時の対応
   - 即座のシステム利用停止
   - 管理者への緊急報告
   - OpenAIへのデータ削除要請
   - 再発防止策の策定
```

#### 出力データ管理
```
確認項目:
- [ ] AI出力の保存場所が適切
- [ ] アクセス権限が制限されている
- [ ] バックアップデータが保護されている
- [ ] 不要データの削除が実施されている

管理状況:
出力データ保存場所: __________________
アクセス可能者数: ______名
データ保持期間: ______ヶ月
最終削除実行日: ____年____月____日
```

### APIキー管理

#### キーセキュリティ
```
確認項目:
- [ ] キーの保存方法が適切（暗号化等）
- [ ] 不要なキーが削除されている
- [ ] キーの定期更新が実施されている
- [ ] 利用制限が適切に設定されている

キー管理状況:
有効キー数: ______個
最終更新日: ____年____月____日
利用制限設定: □有 □無
使用中キー数: ______個
```

#### アクセス制御
```
確認項目:
- [ ] キーへのアクセスが制限されている
- [ ] 管理者権限が適切に設定
- [ ] ログが適切に記録されている
- [ ] 異常アクセスの検出機能が動作

アクセス制御:
キー管理権限者: ______名
アクセスログ保持期間: ______ヶ月
異常検出アラート: □有効 □無効
最終権限見直し日: ____年____月____日
```

## 📊 監査ツールと手法

### 自動監査ツール

#### ログ分析ツール
```python
# ログ分析の例（Python）
import re
import json
from datetime import datetime

def analyze_api_logs(log_file):
    """ＡＰＩ利用ログの分析"""
    
    personal_info_patterns = [
        r'\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b',  # 日付パターン
        r'\b\d{3}-\d{4}-\d{4}\b',            # 電話番号パターン
        r'[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}',  # メールパターン
    ]
    
    violations = []
    
    with open(log_file, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            for pattern in personal_info_patterns:
                if re.search(pattern, line):
                    violations.append({
                        'line': line_num,
                        'pattern': pattern,
                        'content': line.strip()
                    })
    
    return violations

# 使用例
violations = analyze_api_logs('api_usage.log')
if violations:
    print(f"⚠️ 警告: {len(violations)}件の個人情報含有疑いを検出")
    for v in violations:
        print(f"行{v['line']}: {v['content'][:50]}...")
```

#### コスト監視スクリプト
```python
# コスト監視の例
import requests
import os
from datetime import datetime, timedelta

def check_cost_anomaly():
    """コスト異常の検出"""
    
    api_key = os.getenv('OPENAI_API_KEY')
    headers = {'Authorization': f'Bearer {api_key}'}
    
    # 過去7日間のコスト取得
    end_date = datetime.now()
    start_date = end_date - timedelta(days=7)
    
    url = f"https://api.openai.com/v1/usage?start_date={start_date.strftime('%Y-%m-%d')}&end_date={end_date.strftime('%Y-%m-%d')}"
    
    response = requests.get(url, headers=headers)
    usage_data = response.json()
    
    # 異常検出ロジック
    daily_costs = [day['cost'] for day in usage_data.get('data', [])]
    average_cost = sum(daily_costs) / len(daily_costs) if daily_costs else 0
    
    for i, cost in enumerate(daily_costs):
        if cost > average_cost * 2:  # 平均の2倍を異常とする
            print(f"⚠️ コスト異常検出: {start_date + timedelta(days=i)} - ${cost}")
            
    return daily_costs
```

### 手動監査チェックシート

#### 現場監査チェックシート
```
現場監査実施記録

実施日: ____年____月____日
実施者: __________________
対象部署: ________________

物理的セキュリティ:
- [ ] PCの画面ロック設定確認
- [ ] APIキー記載メモの有無確認
- [ ] 第三者の画面のぞき見対策確認
- [ ] USBメモリ等の持ち込み状況確認

操作確認:
- [ ] 適切なログイン手順の実施
- [ ] 個人情報入力の回避
- [ ] AI出力の適切な確認・修正
- [ ] ログアウト手順の実施

教育状況:
- [ ] 利用ガイドラインの理解度
- [ ] セキュリティ意識の確認
- [ ] 緊急時対応の理解度
- [ ] 最新研修の受講状況

特記事項:
_________________________________
_________________________________
```
