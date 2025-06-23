# APIキーの取得と設定

## OpenAIアカウントの作成

### 🏥 医療機関向けアカウント設定

#### 事前準備
医療機関でのOpenAI API利用には、適切なアカウント設定が重要です。

##### 必要な情報
- **医療機関名**: 正式な法人名称
- **責任者情報**: 管理者（院長・IT責任者）
- **連絡先**: 代表メールアドレス・電話番号
- **利用目的**: 医療業務での具体的な活用計画

##### アカウント種別
```
個人アカウント（非推奨）:
- 個人名での登録
- 個人クレジットカードでの支払い
- 医療機関としての保護が不十分

組織アカウント（推奨）:
- 医療機関名での登録
- 法人カードでの支払い
- 適切なガバナンス体制
```

### 📝 アカウント作成手順

#### 1. OpenAI公式サイトにアクセス
- URL: https://platform.openai.com/
- 「Sign up」ボタンをクリック

#### 2. 基本情報の入力
```
入力項目:
- Email: 医療機関の代表メールアドレス
- Password: 強固なパスワード（大小英数記号12文字以上）
- Organization name: 正式な医療機関名
```

#### 3. メール認証
- 登録メールアドレスに認証メール送信
- メール内のリンクをクリックして認証完了

#### 4. 電話番号認証
- SMS認証による本人確認
- 医療機関の代表番号を推奨

## APIキーの生成

### 🔑 キー生成の基本手順

#### 1. API Keys ページへアクセス
- ダッシュボード左メニューから「API Keys」を選択
- または直接 https://platform.openai.com/api-keys

#### 2. 新しいキーの作成
```
手順:
1. 「Create new secret key」をクリック
2. キー名を入力（例：「内科外来用」「文書作成用」）
3. 権限設定（通常は「All」を選択）
4. 「Create secret key」をクリック
```

#### 3. キーの保存
⚠️ **重要**: キーは一度だけ表示されます
```
表示例:
sk-proj-abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ

このキーを安全に保存してください。
再表示はできません。
```

### 🏷️ キーの命名規則

#### 推奨命名パターン
```
部署別:
- naika-gairai-2024（内科外来2024年）
- seikei-2024（整形外科2024年）
- kango-2024（看護部2024年）

用途別:
- bunsho-sakusei（文書作成）
- ronsho-youyaku（論文要約）
- kanja-setsumei（患者説明）

期間別:
- 2024-q1（2024年第1四半期）
- 2024-q2（2024年第2四半期）
```

## BAA（Business Associate Agreement）の申請

### 📋 BAA申請の準備

#### 医療機関の場合、BAA申請を強く推奨
BAA（Business Associate Agreement）により、より厳格なデータ保護が提供されます。

#### 申請前の準備資料
```
必要書類:
1. 医療機関の概要
   - 正式名称・所在地
   - 診療科目・病床数
   - 年間患者数

2. 利用計画書
   - AI活用の目的・範囲
   - 取り扱うデータの種類
   - セキュリティ対策

3. 責任者情報
   - 管理者の詳細情報
   - IT責任者の詳細情報
   - 緊急連絡先
```

### 📧 BAA申請手順

#### 1. 申請メール送信
```
宛先: baa@openai.com
件名: BAA Request - [医療機関名]

本文例:
件名: Business Associate Agreement申請

OpenAI様

[医療機関名]の[役職][氏名]と申します。

弊院では、診療業務の効率化を目的として、
OpenAI APIの利用を検討しております。

患者情報の適切な保護のため、
Business Associate Agreement（BAA）の
締結をお願いいたします。

＜医療機関情報＞
- 正式名称: [医療機関名]
- 所在地: [住所]
- 診療科目: [科目]
- 責任者: [氏名・役職]

＜利用目的＞
- 診療記録の作成支援
- 患者説明資料の作成
- 医学文献の要約

ご不明な点がございましたら、
お気軽にお問い合わせください。

よろしくお願いいたします。

[署名]
```

#### 2. 追加情報の提供
OpenAIから追加情報の要求があった場合、迅速に対応
- より詳細な利用計画
- セキュリティ体制の説明
- 技術的な質問への回答

#### 3. BAA締結
- 通常1-2営業日で初回回答
- 数営業日でBAA締結完了
- ZDR（Zero Data Retention）オプションの利用可能

## 請求・支払い設定

### 💳 支払い方法の設定

#### 推奨支払い方法
```
法人クレジットカード（推奨）:
- 医療機関名義のクレジットカード
- 利用明細の透明性
- 経理処理の簡素化

請求書支払い:
- 月額$1,000以上の場合利用可能
- 銀行振込での支払い
- 法人会計に適した処理
```

#### 請求設定の手順
1. **Billing** ページにアクセス
2. **Payment methods** で支払い方法を設定
3. **Billing information** で請求先情報を入力
4. **Usage limits** で利用上限を設定

### 💰 利用上限の設定

#### 予算管理のための制限設定
```
推奨設定例:

小規模診療所:
- 月額上限: $50-100
- 1日上限: $10
- アラート: 80%到達時

中規模病院:
- 月額上限: $200-500
- 1日上限: $50
- アラート: 70%到達時

大規模病院:
- 月額上限: $1,000-5,000
- 1日上限: $200
- アラート: 60%到達時
```

## APIキーの実装・設定

### 🔧 システムへの実装

#### 環境変数での設定（推奨）
```bash
# .env ファイル
OPENAI_API_KEY=sk-proj-your-secret-key-here
OPENAI_ORG_ID=org-your-organization-id

# 環境変数の設定
export OPENAI_API_KEY="sk-proj-your-secret-key-here"
```

#### アプリケーション設定
```python
# Python例
import openai

# 環境変数から読み込み（推奨）
openai.api_key = os.getenv("OPENAI_API_KEY")

# 直接指定（非推奨）
# openai.api_key = "sk-proj-..." # セキュリティリスクあり
```

#### 設定ファイル（暗号化必須）
```json
// config.json（暗号化必須）
{
  "openai": {
    "api_key": "encrypted_key_here",
    "organization": "org-id-here",
    "max_tokens": 1000,
    "temperature": 0.7
  }
}
```

### 🛡️ セキュアな実装パターン

#### 1. 環境変数 + 暗号化
```python
import os
from cryptography.fernet import Fernet

# 暗号化されたキーの復号化
def decrypt_api_key():
    encrypted_key = os.getenv("ENCRYPTED_OPENAI_KEY")
    key = os.getenv("ENCRYPTION_KEY")
    f = Fernet(key)
    return f.decrypt(encrypted_key.encode()).decode()

# 安全にAPIキーを取得
api_key = decrypt_api_key()
```

#### 2. アクセス制御付きの設定
```python
class SecureAPIConfig:
    def __init__(self):
        self._api_key = None
        self._authorized_users = set()
    
    def authorize_user(self, user_id):
        # ユーザー認証ロジック
        if self.verify_user(user_id):
            self._authorized_users.add(user_id)
    
    def get_api_key(self, user_id):
        if user_id in self._authorized_users:
            return self._load_encrypted_key()
        else:
            raise UnauthorizedError("User not authorized")
```

## テスト・動作確認

### 🧪 基本動作テスト

#### 1. 接続テスト
```python
import openai

try:
    # 簡単なAPI呼び出し
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Hello, this is a test."}],
        max_tokens=10
    )
    print("接続成功:", response.choices[0].message.content)
except Exception as e:
    print("接続エラー:", str(e))
```

#### 2. 権限テスト
```python
# 利用可能なモデルの確認
models = openai.Model.list()
print("利用可能なモデル:")
for model in models.data:
    print(f"- {model.id}")
```

#### 3. 利用量テスト
```python
# 少量のテストデータで動作確認
test_messages = [
    "これはテストメッセージです。",
    "APIの動作確認を行っています。",
    "正常に動作していることを確認してください。"
]

for msg in test_messages:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": msg}],
        max_tokens=50
    )
    print(f"入力: {msg}")
    print(f"出力: {response.choices[0].message.content}\n")
```

### 📊 監視・ログ設定

#### 利用状況の記録
```python
import logging
from datetime import datetime

# ログ設定
logging.basicConfig(
    filename='openai_usage.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def log_api_usage(user_id, model, tokens_used, cost):
    log_entry = {
        'timestamp': datetime.now().isoformat(),
        'user_id': user_id,
        'model': model,
        'tokens': tokens_used,
        'cost': cost
    }
    logging.info(f"API_USAGE: {log_entry}")
```

## トラブルシューティング

### ❗ よくある問題と解決方法

#### 1. 認証エラー
```
エラー: "Incorrect API key provided"

解決方法:
- APIキーの形式確認（sk-proj-で始まる）
- コピー時の余分な文字・空白の削除
- 環境変数の設定確認
```

#### 2. 権限エラー
```
エラー: "You exceeded your current quota"

解決方法:
- 利用上限の確認・増額
- 請求情報の更新
- 支払い方法の確認
```

#### 3. 接続エラー
```
エラー: "Connection timeout"

解決方法:
- ネットワーク接続の確認
- ファイアウォール設定の確認
- プロキシ設定の確認
```

## 次のステップ

APIキーの設定が完了したら、実際の利用方法を確認してください：

- [実践的な使用ガイド](./02-practical-usage.md)
- [セキュリティのベストプラクティス](../03-security/03-api-key-security.md)
- [トラブルシューティング](./03-troubleshooting.md)