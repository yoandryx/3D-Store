const stripePublicKey = "pk_test_51M6kALG3CKKD0RDrM4OXHNtE5BAhkpqgqE1D7kFiDMsxpN4DBR9SaaRYIOlCFIiUn9QNgSv8ttTBk19JbKmzHb9c00jQPhjZqN";
const stripe = Stripe(stripePublicKey)
var stripeHandler; // Declare this variable at the top

let isPurchasing = false; // Flag to prevent multiple clicks

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

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(event) {
  if (isPurchasing) return; // Ignore further clicks until the first is processed
  isPurchasing = true; // Set flag to true

  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var items = [];

  if (cartRows.length === 0) {
      alert("No items in the cart.");
      isPurchasing = false; // Reset flag
      event.target.disabled = false; // Re-enable the button
      return; // Exit early if there are no items
  }

  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var itemName = cartRow.getElementsByClassName('cart-item-title')[0]?.innerText.trim(); // Safely get item name

      if (!itemName) {
          console.error(`Item name not found for item at index ${i}`);
          alert("Item name not found for one or more items.");
          isPurchasing = false; // Reset flag
          event.target.disabled = false; // Re-enable the button
          return; // Exit if any item name is missing
      }

      var id = cartRow.dataset.itemId;

      // Adding item details to the items array
      items.push({
          id: id,
          quantity: 1 // Adjust based on user input if necessary
      });
  }

  // Validate itemName for the first item before sending the request
  var firstItemName = cartRows[0].getElementsByClassName('cart-item-title')[0]?.innerText.trim(); // Safely access the first item name

  if (!firstItemName) {
      console.error("First item name is empty.");
      alert("First item name is empty.");
      isPurchasing = false; // Reset flag
      event.target.disabled = false; // Re-enable the button
      return; // Stop execution if the first itemName is missing or empty
  }

  console.log("Preparing to send purchase request:", {
      itemName: firstItemName,
      items: items
  }); // Log what is being sent in the request

  // Send the purchase request if all validations pass
  fetch('/purchase', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          itemName: firstItemName, // Send the first item name
          items: items
      })
  })
  .then(function(res) {
      return res.json(); // Get the JSON response
  })
  .then(function(data) {
      if (data.url) {
          // Redirect to Stripe checkout
          window.location.href = data.url;
      } else {
          alert(data.message || "Failed to initiate Stripe checkout.");
          isPurchasing = false; // Reset flag
          event.target.disabled = false; // Re-enable the button
      }
  })
  .catch(function(error) {
      console.error(error);
      isPurchasing = false; // Reset flag
      event.target.disabled = false; // Re-enable the button
  });
  event.target.disabled = true;
}

// function purchaseClicked() {
  
//   if (isPurchasing) return; // Ignore further clicks until the first is processed
//     isPurchasing = true; // Set flag to true
  
//   var cartItemContainer = document.getElementsByClassName('cart-items')[0];
//   var cartRows = cartItemContainer.getElementsByClassName('cart-row');
//   var items = [];

//   if (cartRows.length === 0) {
//       alert("No items in the cart.");
//       return; // Exit early if there are no items
//   }

//   for (var i = 0; i < cartRows.length; i++) {
//       var cartRow = cartRows[i];
//       var itemName = cartRow.getElementsByClassName('cart-item-title')[0]?.innerText.trim(); // Safely get item name

//       if (!itemName) {
//           console.error(`Item name not found for item at index ${i}`);
//           alert("Item name not found for one or more items.");
//           return; // Exit if any item name is missing
//       }

//       var id = cartRow.dataset.itemId;

//       // Adding item details to the items array
//       items.push({
//           id: id,
//           quantity: 1 // Adjust based on user input if necessary
//       });
//   }

//   // Validate itemName for the first item before sending the request
//   var firstItemName = cartRows[0].getElementsByClassName('cart-item-title')[0]?.innerText.trim(); // Safely access the first item name

//   if (!firstItemName) {
//       console.error("First item name is empty.");
//       alert("First item name is empty.");
//       return; // Stop execution if the first itemName is missing or empty
//   }

//   console.log("Preparing to send purchase request:", {
//       itemName: firstItemName,
//       items: items
//   }); // Log what is being sent in the request

//   // Send the purchase request if all validations pass
//   fetch('/purchase', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//       },
//       body: JSON.stringify({
//           itemName: firstItemName, // Send the first item name
//           items: items
//       })
//   })
//   .then(function(res) {
//       return res.json(); // Get the JSON response
//   })
//   .then(function(data) {
//       if (data.url) {
//           // Redirect to Stripe checkout
//           window.location.href = data.url;
//       } else {
//           alert(data.message || "Failed to initiate Stripe checkout.");
//       }
//   })
//   .catch(function(error) {
//       console.error(error);
//   });
// }

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
  var button = event.target.closest('.shop-item-button'); // Get the button
  var shopItem = button.closest('.shop-item'); // Get the shop item container

  var title = shopItem.querySelector('.shop-item-title h3').innerText; // Get item title
  var price = shopItem.querySelector('.shop-item-price h6').innerText; // Get item price
  var imageSrc = shopItem.querySelector('.shop-item-image').src; // Get image source
  var id = shopItem.dataset.itemId; // Get item id from the data attribute

  addItemToCart(title, price, imageSrc, id);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc, id) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.dataset.itemId = id
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(title, price, imageSrc, id)
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
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;

    // Calculate total price
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        total += price;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

    // Get the checkout button by its id (submit)
    var checkoutButton = document.getElementById('submit');

    // Enable or disable the checkout button based on total
    if (total >= 1) {
        document.getElementsByClassName('empty-cart')[0].innerText = " ";
        checkoutButton.disabled = false;  // Enable button
    } else {
        document.getElementsByClassName('empty-cart')[0].innerText = "Add items to get started.";
        checkoutButton.disabled = true;  // Disable button
    }
}
