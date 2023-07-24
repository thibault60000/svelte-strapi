const intl = new Intl.NumberFormat('fr-FR', {
	style: 'currency',
	currency: 'EUR',
	useGrouping: true,
	maximumFractionDigits: 2
});

export function formatCurrency(value: number) {
	return value ?? !isNaN(value) ? intl.format(value / 100) : '0 €';
}
