function calculateTotal() {
    let sum = 0;

    // チェックボックス
    document.querySelectorAll('.price:checked').forEach(cb => {
        sum += parseInt(cb.dataset.price);
    });

    // 数量入力
    document.querySelectorAll('.qty').forEach(input => {
        const qty = parseInt(input.value) || 0;
        sum += qty * parseInt(input.dataset.price);
    });

    // 選択式
    document.querySelectorAll('.price-select').forEach(sel => {
        sum += parseInt(sel.value) || 0;
    });

    const multiplied = sum * 10000; // 万円 → 円換算
    document.getElementById('total').textContent = sum.toLocaleString('ja-JP');
    document.getElementById('multiplied').textContent = multiplied.toLocaleString('ja-JP');
}

// イベント登録
document.querySelectorAll('.price, .qty, .price-select').forEach(el => {
    el.addEventListener('input', calculateTotal);
});

// 修理の排他制御
document.querySelectorAll('.repair-normal').forEach(normal => {
    normal.addEventListener('input', () => {
        if (parseInt(normal.value) > 0) {
            document.querySelectorAll('.repair-discount').forEach(discount => discount.value = 0);
        }
        calculateTotal();
    });
});
document.querySelectorAll('.repair-discount').forEach(discount => {
    discount.addEventListener('input', () => {
        if (parseInt(discount.value) > 0) {
            document.querySelectorAll('.repair-normal').forEach(normal => normal.value = 0);
        }
        calculateTotal();
    });
});