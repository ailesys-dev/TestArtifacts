```bash
# [必須] ESLintチェック実行
cd frontend/gakumu
npx eslint src/pages/[対象ファイル].vue --max-warnings=0
```

#### よくあるESLintエラーと対処法

| エラールール                         | エラー内容                      | 修正方法                                               |
| ------------------------------------ | ------------------------------- | ------------------------------------------------------ |
| `@typescript-eslint/no-explicit-any` | `catch (error: any)` の使用     | `catch (error: unknown)` に変更                        |
| `@typescript-eslint/no-explicit-any` | `{ [key: string]: any }` の使用 | `Payload型` + `Record<string, unknown>` キャストに変更 |
| `@typescript-eslint/no-explicit-any` | `sort: any` パラメータ          | `{ prop: string; order: string \| null }` に変更       |
| `unused-imports/no-unused-vars`      | 未使用の変数・関数              | `_` プレフィックスを付与、または削除                   |
| `unused-imports/no-unused-vars`      | 未使用のインポート              | インポート文から削除                                   |
| `no-extra-boolean-cast`              | `!!value` の冗長な二重否定      | `value` のみに変更                                     |
| `no-undef`                           | 未定義の変数参照                | 必要な変数宣言を追加                                   |

#### TODOエラー

| エラー種別                  | 対応         | 理由                                     |
| --------------------------- | ------------ | ---------------------------------------- |
| `filter.and` null チェック  | **直接修正** | 配列初期化とfilterメソッド使用で解決可能 |
| `any` 型の使用              | **TODO化**   | API レスポンスの型定義が機能実装時に必要 |
| 拡張プロパティ（checked等） | **直接修正** | 拡張型を定義して使用                     |
| 未使用import                | **直接修正** | 削除するだけ                             |
| GraphQL関連の型エラー       | **TODO化**   | 機能実装でGraphQL追加時に対応            |
