import CompanyCategories from "../../models/CompanyCategories";

const CompaniesFilters = ({ setFilters , withOwnCompaniesFilter  }) => {

    function updateValuesByFilter() {

    }

    const categoriesWithEmptyString = ['Все', ...(withOwnCompaniesFilter ? ['Собственные'] : []), ...CompanyCategories];



    return (
        <div className="styled-select" style={{ width: "100%" }}>
            <select name="category" onChange={(e) => {
                setFilters({ category: e.target.value });
            }}>
                
                {categoriesWithEmptyString.map((category, index) => (
                    <option key={index}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default CompaniesFilters;