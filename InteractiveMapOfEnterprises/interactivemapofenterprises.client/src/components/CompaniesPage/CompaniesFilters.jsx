import CompanyCategories from "../../models/CompanyCategories";

const CompaniesFilters = ({ setFilters }) => {
    const categoriesWithEmptyString = ['', ...CompanyCategories]; // Adding an empty string to the beginning

    return (
        <div className="styled-select" style={{ width: "100%" }}>
            <select name="category" onChange={(e) => {
                setFilters({ category: e.target.value });
                console.log("SET FILTER");
            }}>
                {categoriesWithEmptyString.map((category, index) => (
                    <option key={index}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default CompaniesFilters;