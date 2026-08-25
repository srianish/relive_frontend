import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

function Favorites() {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites);

  return (
    <div className="favorites-container">

      {favorites.length > 0 ? (
        <>
          <h1 className="page-title">
            Favorite Movies ❤
          </h1>

          <div className="favorites-grid">
            {favorites.map((destination) => (
              <div
                key={destination.id}
                className="favorite-card"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />

                <div className="favorite-content">
                  <h2>{destination.name}</h2>

                  <p>🌍 {destination.country}</p>

                  <p>⭐ {destination.rating}</p>

                  <p>🗣️ ₹{destination.language}</p>

                  <button
                    onClick={() =>
                      dispatch(removeFavorite(destination.id))
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-favorites">
          <h2>🎬 Your Favorite Movies Will Appear Here!</h2>
          <p>Start exploring and tap ❤️ on movies you love.</p>
        </div>
      )}

    </div>
  );
}

export default Favorites;