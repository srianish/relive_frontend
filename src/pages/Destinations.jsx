import { useEffect, useState } from "react";
import api from "../services/api";
import DestinationCard from "../components/DestinationCard";
import { Link } from "react-router-dom";



function Destinations() {
 const [destinations, setDestinations] =
   useState([]);
const [search, setSearch] = useState("");
        const [language, setLanguage] = useState("All");
        const [budget, setBudget] = useState("All");
        const [sort, setSort] = useState("");
        const [genre, setGenre] = useState("All");
        const [rating, setRating] = useState("All");
        const [releaseYear, setReleaseYear] = useState("All");

    useEffect(() => {
        getDestinations();
    }, []);

    async function getDestinations() {
        try {
            const response = await api.get(
                "/destinations"
            );

            setDestinations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteDestination(id) {
        try {
            await api.delete(
                `/destinations/${id}`
            );

            setDestinations(
                destinations.filter(
                    destination =>
                        destination.id !== id
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    const filteredDestinations =
  destinations.filter(
    destination => {

      const searchMatch =
        destination.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const languageMatch =
        language === "All" ||
        destination.language ===
          language;

    const genreMatch =
  genre === "All" ||
  destination.category.includes(genre);
  const ratingMatch =
  rating === "All" ||
  destination.rating >= Number(rating);
  const releaseYearMatch = (() => {
  if (releaseYear === "All") return true;

  const year = Number(destination.releaseDate.split("-")[0]);

  if (releaseYear === "Before2000") return year < 2000;
  if (releaseYear === "2000-2010") return year >= 2000 && year <= 2010;
  if (releaseYear === "2011-2020") return year >= 2011 && year <= 2020;
  if (releaseYear === "2021+") return year >= 2021;

  return true;
})();

      return (
  searchMatch &&
  languageMatch &&
  genreMatch &&
  ratingMatch && releaseYearMatch
);

    }
  );

   let finalDestinations =
  [...filteredDestinations];

if (sort === "high") {

  finalDestinations.sort(
    (a, b) =>
      b.rating - a.rating
  );

}

if (sort === "low") {

  finalDestinations.sort(
    (a, b) =>
      a.rating - b.rating
  );

}

 return (
   <>
   <h1 className="hero-text">Popular Re-Releases</h1>
   <div className="filters">
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    />

                <select
                value={language}
                onChange={(e) =>
                    setLanguage(e.target.value)
                }
                >
                <option>All</option>
                <option>Telugu</option>
                <option>English</option>
                <option>Hindi</option>
                </select>

                <select
  value={releaseYear}
  onChange={(e) => setReleaseYear(e.target.value)}
>
  <option value="All">All Years</option>
  <option value="Before2000">Before 2000</option>
  <option value="2000-2010">2000 - 2010</option>
  <option value="2011-2020">2011 - 2020</option>
  <option value="2021+">2021 & Above</option>
</select>

                <select
  value={genre}
  onChange={(e) => setGenre(e.target.value)}
>
  <option value="All">All Genres</option>
  <option value="Action">Action</option>
  <option value="Adventure">Adventure</option>
  <option value="Fantasy">Fantasy</option>
  <option value="Sci-Fi">Sci-Fi</option>
  <option value="Romance">Romance</option>
  <option value="Drama">Drama</option>
  <option value="Crime">Crime</option>
  <option value="Animation">Animation</option>
  <option value="Superhero">Superhero</option>
</select>
<select
  value={rating}
  onChange={(e) => setRating(e.target.value)}
>
  <option value="All">All Ratings</option>
  <option value="4.9">4.9 ⭐ & Above</option>
  <option value="4.8">4.8 ⭐ & Above</option>
  <option value="4.7">4.7 ⭐ & Above</option>
</select>
            </div>

     <div className="destinations">
       {finalDestinations.map((destination) => (
         <DestinationCard
           key={destination.id}
           destination={destination}
           onDelete={deleteDestination}
         />
       ))}
     </div>
   </>
 );
}

export default Destinations;