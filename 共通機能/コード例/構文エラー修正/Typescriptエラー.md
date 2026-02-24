| エラーコード   | エラーメッセージ                                         | 対処法                                       | 参照             |
| -------------- | -------------------------------------------------------- | -------------------------------------------- | ---------------- |
| ts-plugin 2322 | 型 'string \| null' を型 'number \| null' に割り当て...  | searchConditionの型を`number \| null`に変更  | Phase 1          |
| ts-plugin 2322 | 型 'string \| null' を型 'boolean \| null' に割り当て... | searchConditionの型を`boolean \| null`に変更 | Phase 1          |
| ts-plugin 2339 | プロパティ 'checked' は型 'TblXxxPayload' に存在しません | 拡張型を定義                                 | Phase 4 Step 4-3 |
| ts-plugin 2345 | 引数の型 'unknown' を型 'Error' に割り当て...            | `error as Error`で型アサーション             | Phase 3          |
