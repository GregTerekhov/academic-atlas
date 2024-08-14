export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Невелике навантаження
        { duration: '10s', target: 1000 }, // Різке збільшення навантаження
        { duration: '30s', target: 10 },  // Зниження навантаження
    ],
};

export default function () {
    http.get('http://18.195.118.88/');
}