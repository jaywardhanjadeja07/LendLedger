export function formatINR(amount: number | string) {
    const num = typeof amount === 'string' ? Number(amount) : amount;

    if (isNaN(num)) return '₹0';

    try {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(num);
    } catch (error) {
        // Fallback if Intl is not supported
        return `₹${num.toFixed(0)}`;
    }
}
