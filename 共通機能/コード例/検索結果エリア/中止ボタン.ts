/** 中止ボタンのOnClickイベント */
const OnClickCancelButton = () => {
    // 中止ボタンのメッセージ、メッセージ内容はi18nで定義する。
    if (await alConfirmDialogRef.value!.showConfirmYesNo(t('message.cancel')) === 'reject') {
        return;
    }
    // 表示順コンボボックスの選択状態を初期化する。
    dispOrderComboBox.value = "0";
    // 検索結果エリアの一覧データをクリアする。
    tableItems_TblGakuseki.value = [];
    // 一覧データ読込み前かどうか。各種ボタンの非活性などに関わる。
    isBeforeLoadingTableItems_TblGakuseki.value = true;
    // 全クリアボタンがある画面の場合はこれで検索条件をクリアする。
    OnClickSearchConditionClearButton();
    // 全クリアボタンがない場合は、各値の初期化を行う。
    searchCondition_TblGakuseki.obFlag.value = null;
};

// 配置例
<section id="content02">
    <div class="aladdbutton">
        <AlFileOutputButton @click="OnClickFileOutputButton" />
        <AlCancelButton @click="OnClickCancelButton" />
    </div>
</section>

// 中止ボタンのメッセージ
<i18n lang="json">
{
    "ja": { 
    "message": {
        "cancel": "中止してもよろしいですか？\n入力した内容は保存されません。"
    }
    }
};