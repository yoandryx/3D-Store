// // import express from 'express';
// // import * as dotenv from 'dotenv'
// // import * as fs from 'fs';

// if (process.env.NODE_ENV !== 'production') {
//   // dotenv.config()
//   require('dotenv')
// }

// const stripePublicKey = process.env.STRIPE_PRIVATE_KEY

// const stripe = require("stripe")("sk_test_51M6kALG3CKKD0RDrA3IHBUZqTNtGQsrLvmq7IatjJAle8ZzcBcIcftb91xUZ0NqznUHnsu53WxrFhqH5iK4yvUUy00q5XRN0Fi");

// // const app = express()

// const express = require('express')
// const app = express()
// const fs = require('fs')

// app.set('view engine', 'ejs')
// app.use(express.json())
// app.use(express.static('public'))

// // const storeItems = new Map([
// //   [1, { priceInCents: 3500, name: "Beauty Vase" }],
// // ]);

// app.get('/store/', function(req, res) {
//   fs.readFile('items.json', function(error, data) {
//     if (error) {
//       res.status(500).end()
//     } else {
//       res.render('main.ejs', {
//         stripePublicKey: stripePublicKey,
//         items: JSON.parse(data)
//       })
//     }
//   })
// })

// app.post("/purchase", async (req, res) => {
//   try {

//     fs.readFile('items.json', function(error, data) {
//       if (error) {
//         res.status(500).end();
//       } else {
//         const items = JSON.parse(data);
//         const line_items = items.products.map(item => ({
//           price: item.priceid,
//           quantity: item.quantity
//         }))

//     console.log(itemsArray)
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: line_itemss,
//       // line_items: [
//       //   {
//       //     price: "price_1Mwy5LG3CKKD0RDrNVOIptrA",
//       //     quantity: 1,
//       //     adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
//       //   },
//       // ],
      

//       success_url: `http://localhost:8888/success.html`,
//       cancel_url: `http://localhost:8888/cancel.html`,
//     })
//     res.json({ url: session.url })
//   } catch (e) {
//     res.status(500).json({ error: e.message })
//   }
// })

// app.listen(8888, () => console.log("Node server listening on port 8888!"));



// ******************  Everything below this is valid  ******************




const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
const stripe = require("stripe")("sk_test_51M6kALG3CKKD0RDrA3IHBUZqTNtGQsrLvmq7IatjJAle8ZzcBcIcftb91xUZ0NqznUHnsu53WxrFhqH5iK4yvUUy00q5XRN0Fi"); // Replace this with your Stripe secret key

dotenv.config();
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY; // Assuming you have defined STRIPE_PUBLIC_KEY in your .env file

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

const helmet = require('helmet');

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://static.cloudflareinsights.com'],  // Allow Cloudflare script
    // Add other directives if needed
  }
}));

app.get('/store/', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('main.ejs', {
        stripePublicKey: stripePublicKey,
        items: JSON.parse(data)
      });
    }
  });
});

app.get('/store/', function(req, res) {
  fs.readFile('store.js', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('main.ejs', {
        stripePublicKey: stripePublicKey,
      });
    }
  });
});

app.post("/purchase", async (req, res) => {
  try {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end();
      } else {
        const items = JSON.parse(data);

        if(cartItemNames == "Model 1"){
          const sale = items.Vase.map(item => ({
            price: item.priceid,
            quantity: item.quantity
          }));
        } else if(cartItemNames == "Model 2") {
          const sale = items.Hands.map(item => ({
            price: item.priceid,
            quantity: item.quantity
          }));
        }


        const line_item1 = items.Vase.map(item => ({
          price: item.priceid,
          quantity: item.quantity
        }));
        const line_item2 = items.Hands.map(item => ({
          price: item.priceid,
          quantity: item.quantity
        }));

        console.log(line_item2); // Corrected console.log
        
        stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          // line_items: line_item2, 
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
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8888, () => console.log("Node server listening on port 8888!"));