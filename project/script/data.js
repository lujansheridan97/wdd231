export async function fetchData() {
    const url = 'https://api.example.com/products';  // Replace with actual API URL
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
