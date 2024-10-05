
// ******************  Everything below this is valid  ******************




// const express = require('express');
// const fs = require('fs');
// const dotenv = require('dotenv');
// const stripe = require("stripe")("sk_test_51M6kALG3CKKD0RDrA3IHBUZqTNtGQsrLvmq7IatjJAle8ZzcBcIcftb91xUZ0NqznUHnsu53WxrFhqH5iK4yvUUy00q5XRN0Fi"); // Replace this with your Stripe secret key
// const helmet = require('helmet');

// dotenv.config();
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY; // Assuming you have defined STRIPE_PUBLIC_KEY in your .env file

// const app = express();

// app.set('view engine', 'ejs');
// app.use(express.json());
// app.use(express.static('public'));



// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: [
//       "'self'", 
//       "https://static.cloudflareinsights.com", 
//       "https://js.stripe.com" // Allow Stripe script
//     ],
//     connectSrc: ["'self'", "https://api.stripe.com"], // Allow connections to Stripe API
//     // Add other directives if needed (imgSrc, styleSrc, etc.)
//   },
// }));

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

// app.get('/store/', function(req, res) {
//   fs.readFile('store.js', function(error, data) {
//     if (error) {
//       res.status(500).end();
//     } else {
//       res.render('main.ejs', {
//         stripePublicKey: stripePublicKey,
//       });
//     }
//   });
// });

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

// app.listen(8888, () => console.log("Node server listening on port 8888!"));




// 
// This is a test
// 

const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use environment variable for secret key
const helmet = require('helmet');

dotenv.config();
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: [
      "'self'", 
      "https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015", 
      "https://js.stripe.com"
    ],
    connectSrc: ["'self'", "https://api.stripe.com", "blob:"], // Allow blob URLs
    frameSrc: ["'self'", "https://js.stripe.com"], // Allow Stripe frame
    scriptSrcAttr: ["'self'", "'unsafe-inline'"] // Allow inline script attributes
  }
}));

app.get('/store/', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      return res.status(500).end();
    }
    res.render('main.ejs', {
      stripePublicKey: stripePublicKey,
      items: JSON.parse(data)
    });
  });
});

app.get('/store/', function(req, res) {
  fs.readFile('store.js', function(error, data) {
    if (error) {
      return res.status(500).end();
    }
    res.render('main.ejs', {
      stripePublicKey: stripePublicKey,
      items: JSON.parse(data)
    });
  });
});

app.post("/purchase", async (req, res) => {
  try {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        return res.status(500).end();
      }

      const items = JSON.parse(data);
      const cartItemNames = req.body.itemNames; // Assuming item names are sent in the request body

      let sale;
      if(cartItemNames === "Model 1"){
        sale = items.Vase.map(item => ({
          price: item.priceid,
          quantity: item.quantity
        }));
      } else if(cartItemNames === "Model 2") {
        sale = items.Hands.map(item => ({
          price: item.priceid,
          quantity: item.quantity
        }));
      }

      stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: sale,
        success_url: `http://localhost:8888/success.html`,
        cancel_url: `http://localhost:8888/cancel.html`,
      })
      .then(session => {
        res.json({ url: session.url });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8888, () => console.log("Node server listening on port 8888!"));
