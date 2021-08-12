


function CountryImage(props) {
    const URL = `https://restcountries.eu/data/${props.image}.svg`;
    return <img src={URL} alt={props.name}></img>;
}
export default CountryImage;
