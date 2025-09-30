import { Link } from "react-router";

const Header = ({randomCoin}) => {
    return (
      <div className="headerDiv">
          <Link to="/">
            <h1 className="header">
              {randomCoin && (
                <img 
                  src={randomCoin.image} 
                  alt={randomCoin.name}
                  title={randomCoin.name}
                  className="logo"
                />
              )}
              Crypto Dash
            </h1>
          </Link>
          
        <div className="navbar">
          <Link to="/" ><h2>Home</h2></Link>
          <Link to="/about" ><h2>About</h2></Link>
        </div>

      </div>
        
    );
}
 
export default Header;