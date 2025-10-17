
function List(){

    const fruits = ["Apple", "Banana", "Pineapple", "Sugerken"]

    const eachfruit = fruits.map(fruit => <ul>{fruit}</ul>);
    return (eachfruit);
}
export default List