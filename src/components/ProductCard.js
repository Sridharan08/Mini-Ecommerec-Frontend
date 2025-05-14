import { Link } from 'react-router-dom';

/**
 * Adidas-style product card
 * – Black & white base, blue accent
 * – SPA-friendly links
 * – Accessible alt text
 */
export default function ProductCard({ product }) {
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card adidas-card p-3 rounded border-0 shadow-sm">
        <img
          src={product.images[0].image}
          alt={product.name}
          className="card-img-top mx-auto adidas-img"
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">
            <Link to={`/product/${product._id}`} className="adidas-link">
              {product.name}
            </Link>
          </h5>

          <div className="ratings mt-auto mb-2">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              />
            </div>
          </div>

          <p className="card-text fw-bold">₹{product.price}</p>

          <Link
            to={`/product/${product._id}`}
            className="btn w-100 adidas-btn mt-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
