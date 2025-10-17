function Lists(){

    const Fruits = [
        {name:"Apple", cal: 100},
        {name:"Orange", cal: 200},
        {name:"Banana", cal: 30},
        {name:"Pinaapple", cal: 78}
    ]
    
    const listfruit = Fruits.map(fruit => <li key={fruit.id}>{fruit}</li>);
    return(listfruit);
}
export default Lists