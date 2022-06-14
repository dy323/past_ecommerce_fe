import { Link } from 'react-router-dom';
import "styles/components/search_term.scss"

const SearchTerm = ({recommendation}) => {
    return (
        <div className="_search-terms">
            {recommendation.map((item, i) => {
                if (i < 3) {
                    return (
                        <Link to={`/product?code=${item.code}`} state={{code: item.code, name: item.name, sub_category: item.sub_category}}  key={i} className="search-term">{item.name}</Link>
                    )
                }
            })}
        </div>
    )
}

export default SearchTerm;