const express = require('express');
const fs = require('fs').promises; // Use fs.promises for promise-based file handling
const dotenv = require('dotenv');
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use environment variable for secret key
const helmet = require('helmet');

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const app = express();

app.set('view engine', 'ejs');
app.use(express.json()); // Make sure your Express server is set up to parse JSON and URL-encoded data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // middleware to handle URL-encoded data, especially if you're using forms

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'", 
      "https://static.cloudflareinsights.com", 
      "https://js.stripe.com"
    ],
    connectSrc: ["'self'", "https://api.stripe.com", "blob:"], // Allow blob URLs
    frameSrc: ["'self'", "https://js.stripe.com"], // Allow Stripe frame
    scriptSrcAttr: ["'self'", "'unsafe-inline'"] // Allow inline script attributes
  }
}));

app.get('/store/', async function(req, res) {
  try {
    // Read both files concurrently using Promise.all
    const [itemsData, storeData] = await Promise.all([
      fs.readFile('items.json'),
      fs.readFile('public/store.js')
    ]);

    // Parse the items data
    const items = JSON.parse(itemsData);
    
    // Handle storeData as needed

    res.render('main.ejs', {
      stripePublicKey: stripePublicKey,
      items: items,
      storeData: storeData.toString() // Convert buffer to string if needed
    });

  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
})

app.post("/purchase/", async (req, res) => {
  
  console.log('Purchase route hit');
  console.log('Received data:', req.body);

  if (!req.body.itemName || !req.body.items) {
      console.error('Invalid request data:', req.body);
      return res.status(400).json({ message: 'Invalid request data' });
  }

  try {

    // Validate that req.body.items is an array
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: "Invalid items data in the request." });
    }

    // Read items.json asynchronously using Promises
    const data = await fs.readFile('items.json'); // This returns a Promise

    console.log("Reading items.json...");

    const itemsJson = JSON.parse(data);
    const cartItems = req.body.items;  // Get the items array from the request

    let sale = [];

    // Loop over each cart item to find the corresponding data in items.json
    cartItems.forEach(cartItem => {
      const { id, quantity } = cartItem; // Extract id and quantity

      let itemFound = null;

      // Search for the item in Vase or Hands based on the ID
      itemFound = itemsJson.Vase.find(item => item.id === parseInt(id)) || 
                  itemsJson.Hands.find(item => item.id === parseInt(id));

      if (itemFound) {
        // Add to the sale array for Stripe Checkout
        sale.push({
          price: itemFound.priceid, // Stripe price ID
          quantity: parseInt(quantity) // Ensure quantity is an integer
        });
      }
    });

    console.log("Sale items:", sale);

    // Ensure the sale array is properly constructed
    if (sale.length === 0) {
      return res.status(400).json({ error: "No valid items to purchase." });
    }

    console.log("Creating Stripe checkout session...");

    // Create the Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: sale,
      success_url: `${process.env.CLIENT_URL}/success.html`,
      cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
    });

    res.json({ url: session.url });
    console.log("Session created, redirecting to:", session.url);

  } catch (error) {
    console.error("Server error:", error.message); // Log any server-side errors
    res.status(500).json({ error: error.message });
  }
});

app.listen(8888, () => console.log("Node server listening on port 8888!"));
