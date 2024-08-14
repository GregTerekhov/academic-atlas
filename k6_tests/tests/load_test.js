export const options = {
    vus: 50, // Кількість одночасних користувачів
    duration: '1m', // Тривалість тесту
};

export default function () {
    http.get('http://18.195.118.88/');
}