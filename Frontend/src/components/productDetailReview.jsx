import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../middleware/authContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ProductDetailReview({ product }) {
    const { user, API } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    

    useEffect(() => {
        const getupdate = () => {
        if (product?.reviews) {
            setReviews(product.reviews);
        }
    }
        getupdate();
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !comment) {
            toast.error("Please add rating and comment");
            return;
        }

        const newReview = {
            userName: user?.name,
            userImage: user?.profile?.profilePic,
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString()
        };

        axios.patch(`${API}/addcomment/${product._id}`, newReview).then((d) => {
            console.log(d)
        });

        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment("");
        getupdate();

    };

    return (
        <div className="container mt-3">

            <div className="card p-3 mb-4">
                <h5>
                    Customer Reviews ({reviews.length})
                </h5>

                {reviews.length === 0 && (
                    <p>No reviews yet</p>
                )}
                {reviews.map((rev, index) => (
                    <div
                        key={index}
                        className="border-bottom p-3 d-flex gap-3">
                        {/* USER IMAGE */}
                        <img
                            src={rev.userImage}
                            alt="user"
                            width="50"
                            height="50"
                            style={{
                                borderRadius: "50%",
                                objectFit: "cover"
                            }} />

                        <div>
                            <h6 className="mb-0">
                                {rev.userName}
                            </h6>
                            <small className="text-muted">
                                {rev.date}
                            </small>
                            <div>
                                {[...Array(rev.rating)].map((_, i) => (
                                    <span
                                        key={i}
                                        style={{ color: "gold" }}>
                                        ★
                                    </span>
                                ))}

                            </div>

                            <p className="mb-0">
                                {rev.comment}
                            </p>

                        </div>

                    </div>

                ))}

            </div>
            {/* Write Review */}

            <div className="card p-3">
                <h5>Write a Review</h5>
                {/* Rating */}
                <div className="mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                cursor: "pointer",
                                fontSize: "25px",
                                color: star <= rating ? "gold" : "gray"
                            }}>
                            ★
                        </span>
                    ))}
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="form-control mb-2"
                        placeholder="Write comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button className="btn btn-primary">
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetailReview;