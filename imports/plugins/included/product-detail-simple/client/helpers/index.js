const calculateAverageRating = reviews => {
  const sumOfRatings = reviews.map(review => review.rating)
    .reduce((total, rating) => total + rating, 0);
  let averageRating = Math.floor((sumOfRatings / reviews.length) * 100) / 100;
  if (isNaN(averageRating)) {
    averageRating = 0;
  }

  return averageRating;
};

export default calculateAverageRating;
