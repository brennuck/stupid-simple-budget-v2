const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const formatCurrency = (amount: number) => USDollar.format(amount);
