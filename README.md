# 医療機関向け API キー管理マニュアル

本マニュアルは、総合病院を含む医療機関がLLM（大規模言語モデル）AIのAPIを安全に利用するためのガイドラインです。

## 構成

### [01-basics](./docs/01-basics/) - 基本概念
- LLMとAIの基本概念
- APIとは何か
- 医療機関での活用可能性

### [02-compliance](./docs/02-compliance/) - 法規制・コンプライアンス
- 日本の医療機関における法規制
- 個人情報保護法
- OpenAIのプライバシーポリシー
- BAA（Business Associate Agreement）

### [03-security](./docs/03-security/) - セキュリティガイドライン
- 医療機関特有のセキュリティリスク
- 患者情報の保護
- 事故情報の取り扱い
- セキュリティベストプラクティス

### [04-implementation](./docs/04-implementation/) - 実装・運用
- APIキーの取得と管理
- 実践的な使用方法
- 運用上の注意点
- トラブルシューティング

### [05-reference](./docs/05-reference/) - リファレンス
- クイックリファレンス
- チェックリスト
- 緊急時の連絡先

## 🚀 はじめに

医療機関でのAI活用は、業務効率化と医療の質向上に大きな可能性をもたらします。一方で、患者情報の保護やセキュリティリスクへの適切な対応が不可欠です。

### ⚡ クイックスタート
初めての方は以下の順序で読み進めることをお勧めします：
1. [LLMとは](./docs/01-basics/01-what-is-llm.md) - 基本概念の理解
2. [医療機関での注意点](./docs/01-basics/03-medical-considerations.md) - 重要な制限事項
3. [患者情報保護](./docs/03-security/02-patient-data-protection.md) - セキュリティの基本
4. [APIキーの取得と設定](./docs/04-implementation/01-api-key-setup.md) - 実装手順

### 🎯 対象読者
- 医療機関の管理者・責任者
- IT担当者・システム管理者
- 医師・看護師・医療従事者
- 事務職員・管理部門職員

## 📋 重要な前提条件

### ⚠️ 利用制限
- **診断・治療の最終判断は必ず医師が行う**
- **患者の個人情報は絶対に入力しない**
- **AI出力は参考情報として活用し、必ず検証する**
- **緊急時の判断には使用しない**

### 🏥 医療機関での責任
- 適切なガバナンス体制の構築
- 職員への継続的な教育・研修
- セキュリティインシデントの予防と対応
- 法令遵守の徹底

## 📊 マニュアルの活用方法

### 管理者・責任者向け
- [エグゼクティブサマリー](./docs/05-reference/02-executive-summary.md) - 全体概要と意思決定情報
- [法規制・コンプライアンス](./docs/02-compliance/) - 法的要件の確認
- [クイックリファレンス](./docs/05-reference/01-quick-reference.md) - 緊急時対応

### 実務担当者向け
- [実践的な使用ガイド](./docs/04-implementation/02-practical-usage.md) - 日常業務での活用方法
- [APIキー管理](./docs/04-implementation/01-api-key-setup.md) - 技術的な設定手順
- [セキュリティガイドライン](./docs/03-security/) - 安全な利用方法

## 🔗 外部リンク

### 公式情報
- [OpenAI Platform](https://platform.openai.com/)
- [OpenAI プライバシーポリシー](https://openai.com/ja-JP/policies/row-privacy-policy/)
- [個人情報保護委員会](https://www.ppc.go.jp/)
- [厚生労働省](https://www.mhlw.go.jp/)

### サポート
- [OpenAI ヘルプセンター](https://help.openai.com/)
- [BAA申請](mailto:baa@openai.com)
- [技術サポート](mailto:support@openai.com)

## 📞 緊急時連絡先

**セキュリティインシデント発生時**
1. 院内IT責任者への即座の連絡
2. 該当システムの利用停止
3. OpenAI サポート (support@openai.com) への報告
4. 必要に応じて個人情報保護委員会への報告

## 更新履歴

- 2025-06-23: 初版作成（全セクション完成）
  - 基本概念・法規制・セキュリティ・実装ガイドを網羅
  - 医療機関向けの実践的な内容を重点的に作成
  - OpenAI最新プライバシーポリシー（2024年11月版）反映