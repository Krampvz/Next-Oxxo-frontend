import { TOKEN_NAME } from "@/auth/constants/jwt.constants";
import axios from "axios";
import { cookies } from "next/headers";

const CountPage = async () => {
    try {
        const userCookies = cookies()
        const token = userCookies.get(TOKEN_NAME)?.value
        
        const countLocations = await axios.get("http://127.0.0.1:4000/locations", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        return `Hay tantas locations: ${countLocations?.data?.length}`;
    } catch (error) {
        console.error("Error fetching locations:", error);
        return "Error cargando locations";
    }
};

export default CountPage;