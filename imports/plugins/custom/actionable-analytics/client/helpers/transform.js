
/**
 * Transform data for top selling section
 * @param {Array} orders
 *
 * @returns {Object} transformed results
 */
export const forTopSelling = (orders) => {
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

/**
 * Transform data for overview section
 * @param {Array} orders
 *
 * @returns {Object} overview
 */
export const forOverview = (orders) => {
  const sales = [];
  const shippingCost = [];
  let cancelledOrders = 0;

  orders.map((order) => {
    if (order.workflow.status === "coreOrderWorkflow/completed") {
      order.billing.map((bill) => {
        sales.push(Number(bill.invoice.total));
        shippingCost.push(Number(bill.invoice.shipping));
      });
    }
    if (order.workflow.status === "coreOrderWorkflow/canceled") {
      cancelledOrders += 1;
    }
  });

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const overview = {
    cancelledOrders,
    totalSales: Math.round(sales.reduce(reducer)),
    shippingCost: shippingCost.reduce(reducer),
    totalItemsPurchased: sales.length,
    totalOrdersPlaced: orders.length - sales.length + cancelledOrders
  };
  return overview;
};

/**
 * Transform data for top rated section
 * @param {Array} products
 * @param {Array} productReviews
 *
 * @returns {Object} overview
 */
export const forTopRated = (products, productReviews) => {
  const topRated = [];

  productReviews.map((productReview) => {
    products.map((product) => {
      if (productReview.productId === product._id) {
        topRated.push({
          name: product.title,
          rating: productReview.rating
        });
      }
    });
  });
  return topRated;
};
