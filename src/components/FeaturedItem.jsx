import { Link } from "react-router-dom"
import "./FeaturedItem.css"

const FeaturedItem = ({ item }) => {
  return (
    <div className="featured-item" style={{ backgroundImage: `url(${item.image})` }}>
      <div className="featured-content">
        <h3 className="featured-title">{item.title}</h3>
        <p className="featured-description">{item.description}</p>
        <Link to={item.link} className="featured-button">
          {item.buttonText}
        </Link>
      </div>
    </div>
  )
}

export default FeaturedItem
