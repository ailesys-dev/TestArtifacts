```typescript
<script setup>
import { comparator, getProperty } from "share/src";

/**  テーブル参照 */
const tableGridRef = ref<InstanceType<typeof ElTable> | null>(null);
const tableItems = ref<TblBudaimokuPayload[]>([]);

/**  ページネーション */
const pageSize = ref(100);
const currentPage = ref(1);

/**  ページング用computed */
const pagingTableItems = computed(() => {
    if (!tableItems.value || tableItems.value.length == 0) {
        return [];
    }
    return tableItems.value.slice(
        pageSize.value * currentPage.value - pageSize.value,
        pageSize.value * currentPage.value
    );
});

/**  空データ時のメッセージ */
const getTableItemsEmptyText = () => {
    return isBeforeLoadingTableItems.value
        ? t('getTableItemsEmptyText.pleaseSearch')
        : t('getTableItemsEmptyText.noDataAvailable');
};

/**  ページ変更 */
const currentPageOnChange = (page: number) => {
    currentPage.value = page;
};

/**  ページサイズ変更 */
const pageSizeOnChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
};
</script>

<template>
    //  ページネーション -->
    <el-pagination
        layout="->, prev, pager, next, total, sizes"
        :page-size="pageSize"
        :page-sizes="defaultPageSizesOption"
        :current-page="currentPage"
        :total="tableItems.length"
        @current-change="currentPageOnChange"
        @size-change="pageSizeOnChange" />

    //  テーブル -->
    <el-table
        ref="tableGridRef"
        v-loading="isLoadingTableItems"
        :data="pagingTableItems"
        row-key="id"
        :empty-text="getTableItemsEmptyText()"
        height="520"
        style="width:100%;"
        size="small"
        border
        stripe
        @sort-change="sortOnChange">

        //  MD仕様書の表示項目に応じて列を定義 -->
        //  sortable="custom"を指定（sortableのみは禁止） -->
        <el-table-column
            prop="code"
            label="コード"
            align="left"
            width="140"
            sortable="custom" />

        <el-table-column
            prop="meisyou"
            label="名称"
            align="left"
            width="200"
            sortable="custom" />
    </el-table>
</template>
```
