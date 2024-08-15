function formatCurrency(prize: number): string {
  return `$${prize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export default formatCurrency;
