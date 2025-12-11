// GetFilteredTblGakusekiQueryVariables 型のオブジェクト（pageNumber, filter, sortOrders を含む）
const buildSearchParam_TblGakuseki = (): GetFilteredTblGakusekiQueryVariables => {
    const filter: FilterExpression = { and: [] };
    // 各フィルタ参照が未設定の場合は空のフィルタとして扱い、全体のAND条件に影響を与えない
    filter.and?.push(TblGakuseki_shozoku1IdRef.value?.GetFilter("shozoku1Id") || ([] as FilterExpression));
    filter.and?.push(TblGakuseki_shozoku2IdRef.value?.GetFilter("shozoku2Id") || ([] as FilterExpression));
    filter.and?.push(TblGakuseki_shozoku3IdRef.value?.GetFilter("shozoku3Id") || ([] as FilterExpression));
    filter.and?.push(TblGakuseki_shozoku4IdRef.value?.GetFilter("shozoku4Id") || ([] as FilterExpression));
    filter.and?.push(TblGakuseki_nenjiRef.value?.GetFilter("nenji") || ([] as FilterExpression));
    filter.and?.push(TblGakuseki_code8Ref.value?.GetFilter("code8") || ([] as FilterExpression));
    filter.and?.push({ expr: { field: "obFlag", op: { eq: "0" } } });
    return <GetFilteredTblGakusekiQueryVariables>{
        // ページ番号は 1 を固定で返す
        pageNumber: 1,
        filter: filter,
        // 並び順は id 昇順（order: 1）で設定
        sortOrders: { models: [{ field: "id", order: 1 }] },
    };
};