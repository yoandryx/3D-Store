
const stripePublicKey = "pk_test_51M6kALG3CKKD0RDrM4OXHNtE5BAhkpqgqE1D7kFiDMsxpN4DBR9SaaRYIOlCFIiUn9QNgSv8ttTBk19JbKmzHb9c00jQPhjZqN";

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    // for (var i = 0; i < quantityInputs.length; i++) {
    for (var i = 0; i < quantityInputs.length; 0) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


// var stripeHandler = await stripe.checkout.sessions.create({
//     key: stripePublicKey,
//     locale: 'auto',
//     token: function(token) {
//         var items = []
//         var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//         var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//         for (var i = 0; i < cartRows.length; i++) {
//             var cartRow = cartRows[i]
//             var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//             var quantity = quantityElement.value
//             var id = cartRow.dataset.itemId
//             items.push({
//                 id: id,
//                 quantity: quantity
//             })
//         }

//         fetch('/purchase', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify({
//                 stripeTokenId: token.id,
//                 items: items
//             })
//         }).then(function(res) {
//             return res.json()
//         }).then(function(data) {
//             alert(data.message)
//             var cartItems = document.getElementsByClassName('cart-items')[0]
//             while (cartItems.hasChildNodes()) {
//                 cartItems.removeChild(cartItems.firstChild)
//             }
//             updateCartTotal()
//         }).catch(function(error) {
//             console.error(error)
//         })
//     }
// })

function purchaseClicked() {
    var priceElement = document.getElementsByClassName('cart-total-price')[0]
    var price = parseFloat(priceElement.innerText.replace('$', '')) * 100
    stripeHandler.open({
        amount: price
    })
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var id = shopItem.dataset.itemId
    addItemToCart(title, price, imageSrc, id)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc, id) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.dataset.itemId = id
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(cartItemNames)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-container">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <!--<input class="cart-quantity-input" id="unit_count" type="number" value="1"> -->
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div> 
        </div>
        
        `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        // var quantity = quantityElement.value
        // total = total + (price * quantity)
        total = total + price
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

    if(total >=1){
        document.getElementsByClassName('empty-cart')[0].innerText = "  "
        checkout.disabled = false;
    } else {
        document.getElementsByClassName('empty-cart')[0].innerText = " Add items to get started. "
        checkout.disabled = true;
    }
}


// ******************  Everything below this is valid  ******************




// const express = require('express');
// const fs = require('fs');
// const dotenv = require('dotenv');
// const stripe = require("stripe")("sk_test_51M6kALG3CKKD0RDrA3IHBUZqTNtGQsrLvmq7IatjJAle8ZzcBcIcftb91xUZ0NqznUHnsu53WxrFhqH5iK4yvUUy00q5XRN0Fi"); // Replace this with your Stripe secret key

// dotenv.config();
// // const stripePublicKey = process.env.STRIPE_PUBLIC_KEY; // Assuming you have defined STRIPE_PUBLIC_KEY in your .env file

// const app = express();

// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.static('public'));

// app.get('/store/', function(req, res) {
//   fs.readFile('items.json', function(error, data) {
//     if (error) {
//       res.status(500).end();
//     } else {
//       res.render('main.ejs', {
//         stripePublicKey: stripePublicKey,
//         items: JSON.parse(data)
//       });
//     }
//   });
// });

// // app.get('/store/', function(req, res) {
// //   fs.readFile('store.js', function(error, data) {
// //     if (error) {
// //       res.status(500).end();
// //     } else {
// //       res.render('main.ejs', {
// //         stripePublicKey: stripePublicKey,
// //       });
// //     }
// //   });
// // });

// app.post("/purchase", async (req, res) => {
//   try {
//     fs.readFile('items.json', function(error, data) {
//       if (error) {
//         res.status(500).end();
//       } else {
//         const items = JSON.parse(data);

//         if(cartItemNames == "Model 1"){
//           const sale = items.Vase.map(item => ({
//             price: item.priceid,
//             quantity: item.quantity
//           }));
//         } else if(cartItemNames == "Model 2") {
//           const sale = items.Hands.map(item => ({
//             price: item.priceid,
//             quantity: item.quantity
//           }));
//         }


//         const line_item1 = items.Vase.map(item => ({
//           price: item.priceid,
//           quantity: item.quantity
//         }));
//         const line_item2 = items.Hands.map(item => ({
//           price: item.priceid,
//           quantity: item.quantity
//         }));

//         console.log(line_item2); // Corrected console.log
        
//         stripe.checkout.sessions.create({
//           payment_method_types: ["card"],
//           mode: "payment",
//           // line_items: line_item2, 
//           line_items: sale,
//           success_url: `http://localhost:8888/success.html`,
//           cancel_url: `http://localhost:8888/cancel.html`,
//         })
//         .then(session => {
//           res.json({ url: session.url });
//         })
//         .catch(error => {
//           res.status(500).json({ error: error.message });
//         });
//       }
//     });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// app.listen(8888, () => console.log("server listening on port 8888!"));