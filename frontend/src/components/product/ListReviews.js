import React from "react";

const ListReviews = ({ reviews }) => {
  return (
    <div className="reviews ">
      <h3 className="u-margin-bottom-small">Reviews:</h3>
      {/* <hr /> */}
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(review.ratting /5)*100}%` }}></div>
            </div>
            <p className="review_user">by {review.name}</p>
            <p className="review_comment">{review.comment}</p>

            <hr />
          </div>
        ))}
    </div>
  );
};

export default ListReviews;
