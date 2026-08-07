import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function DestinationDetails() {
 const { id } = useParams();

 const [destination, setDestination] =
   useState(null);

 useEffect(() => {
   getDestination();
 }, []);

 async function getDestination() {
   try {
     const response = await api.get(
       `/destinations/${id}`
     );

     setDestination(response.data);
   } catch (error) {
     console.log(error);
   }
 }

 if (!destination) {
   return <h2>Loading...</h2>;
 }

 return (
   <div className="details">
     <img
       src={destination.image}
       alt={destination.name}
     />

     <h1>{destination.name}</h1>

     <p>{destination.description}</p>

     <h3>Country</h3>
     <p>{destination.country}</p>

     <h3>Category</h3>
     <p>{destination.category}</p>

     <h3>Best Time To watch</h3>
     <p>{destination.bestTimeToWatch}</p>

     <h3>Duration</h3>
     <p>{destination.duration}</p>

     <h3>Language</h3>
     <p>{destination.language}</p>

     <h3>Budget</h3>
     <p>₹ {destination.price}</p>

     <h3>Rating</h3>
     <p>{destination.rating}</p>

     <h3>Release date</h3>
     <p>{destination.releaseDate}</p>

     <h3>Top Attractions</h3>

     {destination.attraction && <ul>
       {destination.attractions.map(
         (place, index) => (
           <li key={index}>{place}</li>
         )
       )}
     </ul>}
   </div>
 );
}

export default DestinationDetails;