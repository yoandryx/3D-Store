
const checkout = document.getElementById('submit');

checkout.addEventListener("click", () => {
    // fetch("http://localhost:8888/create-checkout-session", {
    fetch("http://localhost:8888/purchase", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 1 }
            ]
        })
    }).then(async res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        window.location = url
        console.log("idk");

    }).catch(e => {
        console.error(e.error);
        console.log("som");
    })
})