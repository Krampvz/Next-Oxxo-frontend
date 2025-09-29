import axios from "axios";

const CountPage = async () => {
    try {
        const countLocations = await axios.get("http://127.0.0.1:4000/locations");
        return `Hay tantas locations: ${countLocations?.data?.length}`;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return "Error cargando locations";
    }
};

export default CountPage;