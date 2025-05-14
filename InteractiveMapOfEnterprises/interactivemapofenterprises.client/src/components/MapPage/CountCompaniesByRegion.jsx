import { useState, useEffect } from "react";
import companiesService from "../../services/companiesService";

function CountCompaniesByRegion(regionId = "belarus") {
    const [compaiesCount, setCompaiesCount] = useState(0);
    useEffect(() => {
            companiesService.getAll().then((result) => {
                setCompaiesCount(result?.lenght ?? 0);
            });
    }, []);
    return (
        <div>Созданных компаний : {compaiesCount} </div >)
};
export default CountCompaniesByRegion;