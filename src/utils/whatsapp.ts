import { CartItem, Product } from '../types';

export interface WhatsAppCustomerInfo {
  customerName?: string;
  phone?: string;
  email?: string;
  address?: string;
  notes?: string;
}

export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING_RATE = 9;

export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return FLAT_SHIPPING_RATE;
}

export function buildWhatsAppOrderMessage(
  items: CartItem[],
  customer?: WhatsAppCustomerInfo
): string {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const lines: string[] = [
    'PAPRIVA — Where Every Idea Begins.',
    'Order Request',
    '',
  ];

  if (
    customer?.customerName ||
    customer?.phone ||
    customer?.email ||
    customer?.address
  ) {
    lines.push('Customer Details:');
    if (customer.customerName) lines.push(`Name: ${customer.customerName}`);
    if (customer.phone) lines.push(`Phone: ${customer.phone}`);
    if (customer.email) lines.push(`Email: ${customer.email}`);
    if (customer.address) lines.push(`Delivery Address: ${customer.address}`);
    if (customer.notes) lines.push(`Notes: ${customer.notes}`);
    lines.push('');
  }

  lines.push('Items:');
  items.forEach((item, index) => {
    const lineTotal = (item.product.price * item.quantity).toFixed(2);
    lines.push(
      `${index + 1}. ${item.product.name} (${item.variantName}) × ${item.quantity} — $${lineTotal}`
    );
  });

  lines.push('');
  lines.push(`Subtotal: $${subtotal.toFixed(2)}`);
  lines.push(
    `Shipping: ${shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}`
  );
  lines.push(`Estimated Total: $${total.toFixed(2)}`);

  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(
  items: CartItem[],
  customer?: WhatsAppCustomerInfo
): string {
  const text = buildWhatsAppOrderMessage(items, customer);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export function buildSingleProductWhatsAppUrl(
  product: Product,
  variantName: string,
  quantity: number
): string {
  return buildWhatsAppOrderUrl([{ product, variantName, quantity }]);
}
