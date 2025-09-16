function createPerson(name, lastName, age) {
    return {
        name,
        lastName,
        age
    }
}

let person1 = createPerson('Emerson', 'Lacerda', 90);
let person2 = createPerson('Thalita', 'Angelica', 20);

console.log(person1.name);