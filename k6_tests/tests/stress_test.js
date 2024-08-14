export const options = {
    stages: [
        { duration: '2m', target: 100 }, // Різке збільшення навантаження
        { duration: '5m', target: 100 }, // Плато з високим навантаженням
        { duration: '2m', target: 0 },   // Зниження навантаження
    ],
};

export default function () {
    http.get('http://18.195.118.88/');
}