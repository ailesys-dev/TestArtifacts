/\*_ GetFilterメソッドを持つコンポーネントのref定義 _/

```typescript
const TblGakuseki_shozoku1IdRef = ref<InstanceType<typeof AlBukyoku1Search> | null>(null);
const TblGakuseki_shozoku2IdRef = ref<InstanceType<typeof AlBukyoku2Search> | null>(null);


**[禁止]** 以下のコンポーネントにはrefを定義しない（GetFilterメソッドがないため）:
- `AlCheckBox`（単独使用時）
- `AlTargetPeriodCond`
- `AlInputStatusSearch`

/**  検索条件の型定義 */
const searchCondition = reactive<{
    nendo: number | null,                    //  AlNendoSearch
    shozoku1Id: string | null,               //  AlBukyoku1Search
    code: {                                   //  AlLectureCodeRangeSearch
        rangeStart: string | null;
        rangeEnd: string | null;
    },
    omrcode: boolean | null,                 //  チェックボックス用フラグ
}>({
    nendo: null,
    shozoku1Id: null,
    code: { rangeStart: null, rangeEnd: null },
    omrcode: null,
});
```
