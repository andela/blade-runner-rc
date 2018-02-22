
const transformForBarChart = (orders) => {
  const transformedOrders = [];
  orders.map(order => {
    order.items.map(item => {
      transformedOrders.push({
        id: item.productId,
        name: item.title,
        quantity: item.quantity
      });
    });
  });
  const results = [];
  transformedOrders.forEach(order => {
    const itemIndex = results.findIndex(orderInResults => orderInResults.id === order.id);
    if (itemIndex === -1) {
      results.push(order);
    } else {
      results[itemIndex].quantity += order.quantity;
    }
  });
  return results;
};

export default transformForBarChart;
