const loadTableItems_TblGakuseki = async (): Promise<boolean> => {
    // ローディング状態とキャンセルフラグを初期化
    isLoadingTableItems_TblGakuseki.value = true;
    loadCancelFlag.value = false;
    try {
        // ページ番号を1に設定
        currentPage_TblGakuseki.value = 1;
        // 既存のエラー・テーブルアイテムをクリア
        loadErrorMessages_TblGakuseki.value.length = 0;
        tableItems_TblGakuseki.value.length = 0;
        // グリッドのソートをリセット
        tableGridRef_TblGakuseki.value?.clearSort();
        const searchParam = buildSearchParam_TblGakuseki();
        let existsNextPage = false;
        do {
            // 検索条件（searchParam）に基づく学籍データをページ単位で取得
            const response = await services.api.getFilteredTblGakuseki(searchParam);
            if (loadCancelFlag.value) break;
            if (response.data.getFilteredTblGakuseki?.list) {
                // 取得済みの学籍レコードが累積される
                tableItems_TblGakuseki.value = tableItems_TblGakuseki.value.concat(response.data.getFilteredTblGakuseki.list);
                existsNextPage = response.data.getFilteredTblGakuseki?.pagingInfo?.existsNextPage || false;
                // レスポンスに list がない場合は existsNextPage を false として終了
            } else {
                existsNextPage = false;
            }
            // 各ループで1ページずつ増加
            searchParam.pageNumber++;
            // 取得可能なページがなくなる、またはキャンセルされた時点でループを終了
        } while (existsNextPage && !loadCancelFlag.value);
        return true;
    } catch (error: unknown) {
        // 失敗時にエラーメッセージを表示
        loadErrorMessages_TblGakuseki.value = loadErrorMessages_TblGakuseki.value.concat(buildMessagesFromErrorResponse(error, null, t));
        alConfirmDialogRef.value?.showError(loadErrorMessages_TblGakuseki.value.join("\n"));
        throw error;
    } finally {
        // ローディング状態とキャンセルフラグをキャンセル有無に基づき更新
        isBeforeLoadingTableItems_TblGakuseki.value = loadCancelFlag.value;
        // ローディング状態を解除
        isLoadingTableItems_TblGakuseki.value = false;
    }
};

// 副作用:
// - currentPage_TblGakuseki, loadErrorMessages_TblGakuseki, tableItems_TblGakuseki,
//   isLoadingTableItems_TblGakuseki, isBeforeLoadingTableItems_TblGakuseki、
//   tableGridRef_TblGakuseki の状態を更新する。