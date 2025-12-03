import { ref } from "vue";
import { SortModel, getProperty, comparator } from "share/src";
const radioSortOption = ref<RadioSortex[]>();
interface RadioSortex extends SortModel {
    radioSort?: string;
}

/** 現在一覧データの読込み中か */
const isLoadingTableItems_TblGakuseki = ref(false);

//コンボボックスの選択用並び順処理
const conditionComboBox = () => {
    tableItems_TblGakuseki.value.sort((a, b) => {
        for (const e of radioSortOption.value ?? []) {
            const field = e.radioSort ?? e.field;
            const _a = getProperty(a, field);
            if (_a == undefined) return 1;
            const _b = getProperty(b, field);
            if (_b == undefined) return -1;
            const order = comparator(_a, _b) * (e.order ?? 0);
            if (order !== 0) return order;
        }
        return 0;
    });
};

/** 表示順コンボボックスのOnChangeイベント */
const dispOrderComboBox = ref('0');
const OnChangedispOrderComboBox = () => {
    /*
    選択された項目で一覧表を並べ替える。
    fieldにはフロント側のプロパティ名を設定すること。
    名称系はカナ用を使用しないと五十音順にならない。
    */
    switch (dispOrderComboBox.value) {
        case '0': // 状態 (+学籍番号)  
            radioSortOption.value = [
                { field: 'dUserPayload.registType', order: 1 },
                { field: 'code8', order: 1 }
            ];
            break;
        case '1': // 学籍番号  
            radioSortOption.value = [{ field: 'code8', order: 1 }];
            break;
        case '2': // 学生氏名(+学籍番号)  
            radioSortOption.value = [
                { field: 'kanaShimei', order: 1 },
                { field: 'code8', order: 1 }
            ];
            break;
        case '3': // 異動(+学籍番号)  
            radioSortOption.value = [
                { field: 'idouMeisyou', order: 1 },
                { field: 'code8', order: 1 }
            ];
            break;
    }
    //一覧が完全に読み込まれた時メソッド実行
    if (!isLoadingTableItems_TblGakuseki.value) {
        conditionComboBox();
    }
};

/**
 * 一覧データの並び替え
 * @param prop 対象プロパティ
 * @param order 並び順('ascending':昇順; 'descending':降順)
 */
const sortTableItems_TblGakuseki = async (prop: string, order: string): Promise<boolean> => {
    try {
        const asc = (order === "descending") ? -1 : 1;
        tableItems_TblGakuseki.value.sort((a, b) => comparator(getProperty(a, prop), getProperty(b, prop)) * asc);
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/** 並び替え更新時イベント */
const sortOnChange_TblGakuseki = (sort: { prop: string; order: string | null }) => {
    if (sort.order == null) {
        // コンボボックスの選択状態を確認  
        if (dispOrderComboBox.value) {
            // コンボボックスで選択されている順序を適用  
            OnChangedispOrderComboBox();
        } else {
            // コンボボックスが未選択の場合はデフォルト  
            dispOrderComboBox.value = "0";
            OnChangedispOrderComboBox();
        }
    } else {
        // 列ヘッダーからのソート
        const prop = sort.prop!;
        const order = sort.order;
        sortTableItems_TblGakuseki(prop, order);
    }
};

// @sort-change="sortOnChange_TblGakuseki"の形式でel-tableのsort-changeイベントを定義する
                        <div class="tablecontentarea">
                            <div class="orderbox">
                                <AlLabel :itemName="t('Tool.Tool.dispOrder')" />
                                <AlComboBox
                                    v-model="dispOrderComboBox"
                                    :items="dispOrderComboBoxItems()"
                                    @change="OnChangedispOrderComboBox" />
                            </div>
                        </div>