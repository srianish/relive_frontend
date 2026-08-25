import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    getDestination();
  }, [id]);

  async function getDestination() {
    try {
      const response = await api.get(`/destinations/${id}`);
      console.log("Movie data:", response.data);
      setDestination(response.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  }

  function getYoutubeEmbedUrl(url) {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);
      let videoId = "";

      // youtu.be/VIDEO_ID
      if (parsedUrl.hostname.includes("youtu.be")) {
        videoId = parsedUrl.pathname.substring(1);
      }

      // youtube.com/watch?v=VIDEO_ID
      if (parsedUrl.hostname.includes("youtube.com")) {
        videoId = parsedUrl.searchParams.get("v") || "";

        // youtube.com/embed/VIDEO_ID
        if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
          videoId = parsedUrl.pathname.split("/embed/")[1];
        }

        // youtube.com/shorts/VIDEO_ID
        if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
          videoId = parsedUrl.pathname.split("/shorts/")[1];
        }
      }

      if (!videoId) {
        console.warn("No YouTube video ID found:", url);
        return "";
      }

      // IMPORTANT: return a normal URL, NOT Markdown
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } catch (error) {
      console.error("Invalid YouTube URL:", error);
      return "";
    }
  }

  if (!destination) {
    return <h2>Loading...</h2>;
  }

  const trailerEmbedUrl = getYoutubeEmbedUrl(destination.trailerUrl);

  console.log("Trailer URL:", destination.trailerUrl);
  console.log("Embed URL:", trailerEmbedUrl);

  return (
    <div className="details">

      {/* Trailer replaces movie image */}
      {trailerEmbedUrl ? (
        <div className="movie-trailer-container">
          <iframe
            src={trailerEmbedUrl}
            title={`${destination.name} Trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <img
          src={destination.image}
          alt={destination.name}
          className="movie-poster"
        />
      )}

      <h1>{destination.name}</h1>

      <p>{destination.description}</p>

      <h3>Country</h3>
      <p>{destination.country}</p>

      <h3>Category</h3>
      <p>{destination.category}</p>

      <h3>Best Time To Watch</h3>
      <p>{destination.bestTimeToWatch}</p>

      <h3>Duration</h3>
      <p>{destination.duration}</p>

      <h3>Language</h3>
      <p>{destination.language}</p>

      <h3>Budget</h3>
      <p>₹ {destination.price}</p>

      <h3>Rating</h3>
      <p>⭐ {destination.rating}</p>

      <h3>Release Date</h3>
      <p>{destination.releaseDate}</p>

      <h3>Theatre</h3>
      <p>{destination.theatre}</p>

      <h3>Location</h3>
      <p>{destination.location}</p>

      <h3>Show Timings</h3>

      <ul>
        {destination.showTimings?.map((time, index) => (
          <li key={index}>{time}</li>
        ))}
      </ul>

      <h3>Top Attractions</h3>

      {Array.isArray(destination.attractions) && (
        <ul>
          {destination.attractions.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default DestinationDetails;