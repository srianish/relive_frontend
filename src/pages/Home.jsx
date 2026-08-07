import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import "../index.css";

function Home() {
 return (
   <>
      <section className="hero-section">

        <div className="hero-text">
          <h1>
          Experience <span className="nostalgia">Nostalgia</span> Again.
          </h1>

          <p>
            Rediscover timeless classics, unforgettable adventures,
            and legendary stories. Book your favorite movies and
            relive every magical moment.
          </p>
        </div>

        

        <div className="hero-banner">
          <img src={hero} alt="Movie Banner" />
        </div>

        <div className="caption-container">
  <p className="hero-caption">
    Help us add the movies you'd love to watch in theaters again.
  </p>
</div>

        <Link className="add-btn" to="/add-destination">
      Add Movies
    </Link>

      </section>

      {/* Your movie cards below */}
    </>
 );
}

export default Home;