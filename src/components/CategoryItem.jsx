import { Link } from "react-router-dom"
import "./CategoryItem.css"

const CategoryItem = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`} className="category-item">
      <div className="category-icon">{category.icon}</div>
      <h3 className="category-name">{category.name}</h3>
    </Link>
  )
}

export default CategoryItem
