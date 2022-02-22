export const orderStatus = {
    in_delivery: 'In Delivery',
    over_delivery: 'Over Delivery',
    completed: 'Completed',
    in_dispute: 'Disputed',
};
export function getOrderStatus(order) {
    let { status, deliveryTime } = order;

    if (
        order.status === 'in_delivery' &&
        new Date(deliveryTime).getTime() > new Date().getTime()
    ) {
        status = 'in_delivery';
    }

    if (
        order.status === 'in_delivery' &&
        new Date(deliveryTime).getTime() < new Date().getTime()
    ) {
        status = 'over_delivery';
    }

    if (
        order.status === 'over_delivery' &&
        new Date(deliveryTime).getTime() < new Date().getTime()
    ) {
        status = 'over_delivery';
    }
    if (orderStatus[order.status] === 'over_delivery') {
        status = 'over_delivery';
    }
    return status;
}
