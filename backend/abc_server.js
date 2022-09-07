require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./User/User');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Product = require('./Product/Product')
const Cart = require('./Cart/Cart')
const path = require('path')

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/api/paypal-config', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})

app.post('/api/users/login', async (req, res) => {
  const { user, password } = req.body;
  const foundUser = await User.findOne({ username: user });
  if (!foundUser) {
    res.status(404).send({ message: "user not found" })
  } else {
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      res.status(401).send({ message: 'incorrect password' })
    } else {
      res.status(200).send(foundUser);
    }
  }
})
app.post('/api/users/signup', async (req, res) => {
  const { username, password, email, phone, shipping } = req.body;
  const foundUser = await User.findOne({ username: username });
  const foundEmail = await User.findOne({ email: email });
  if (foundUser || foundEmail) {
    res.status(409).json({ message: 'user already exsit' })
  } else {
    try {
      const cryptedPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        username: username,
        password: cryptedPassword,
        email: email,
        phone: phone,
        shipping: [shipping]
      });
      res.status(201).send(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
})

app.post('/api/your-saved-cart', async (req, res) => {
  const { username } = req.body;
  const result = await Cart.findOne({ username, paid:false });
  if (!result) {
    res.sendStatus(404);
  } else {
    res.status(200).send(result);
  }

})
app.post('/api/your-cart', async (req, res) => {
  const { username, cart, paid } = req.body;
  try {
    const foundCart = await Cart.findOne({ username });
    if (!foundCart) {
      const result = await Cart.create({ username, cart});
      res.status(200).send(`${username}'s new cart saved`);
    } else if(paid){
      foundCart.paid=true;
      foundCart.cart=cart;
      const result=await foundCart.save();
    }else {
      foundCart.cart = cart;
      const result = await foundCart.save();
    }
  } catch (err) {
    res.send({ message: `${username}'s new not saved` });
  }

})

app.post('/api/newproduct', async (req, res) => {
  const { category, name, slug, image, price, spec, stock, brand, desc } = req.body;
  try {
    let newProduct = {
      category: category,
      product: {
        name: name,
        slug: slug,
        image: image,
        price: Number(price),
        specification: [{ specification: spec }],
        inStock: Number(stock),
        brand: brand,
        description: desc
      }
    };
    const result = await Product.create(newProduct);
    res.send(result);
  } catch (err) {
    res.send({ message: err.message })
  }
})

app.get('/api/products', async (req, res) => {
  try {
    const metalProducts = await Product.find({ category: 'metalProducts' }).limit(8);
    const compoundProducts = await Product.find({ category: 'compoundProducts' }).limit(8);
    let pros = [
      {
        category: 'metalProducts',
        products: metalProducts
      },
      {
        category: 'compoundProducts',
        products: compoundProducts
      }
    ];
    res.status(200).send(pros);

  } catch (err) {
    res.send({ message: err.message });
  }
})
app.get('/api/products/:category', async (req, res) => {

  const category = req.params.category;
  try {
    const products = await Product.find({ category }).limit(12);
    res.send(products);

  } catch (err) {
    res.send({ message: error.message })
  }
})
app.get('/api/products/:category/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ 'product.slug': slug });
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ message: 'product not found' });
  }
})
app.post('/api/products/search-product', async (req, res) => {
  const { searchItem } = req.body;
  const foundProduct = await Product.findOne({ 'product.slug': searchItem });
  if (foundProduct) {
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send({ message: 'product not found' });
  }

})
app.post('/api/products/modify-a-product', async (req, res) => {
  const { slug, newPrice, newQuantity } = req.body;
  const foundProduct = await Product.findOne({ 'product.slug': slug });
  if (!foundProduct) {
    res.status(404).send({ message: 'the product you try to modify does not exsit' })
  } else {
    if (newPrice !== 0) {
      foundProduct.product.price = newPrice;
    }
    if (newQuantity !== 0) {
      foundProduct.product.inStock = foundProduct.product.inStock + newQuantity * 1;
    }

    try {
      const result = await foundProduct.save();
      res.status(200).send({ message: `${slug}  update success` });
    } catch (err) {
      res.send(err.message);
    }
  }
})

app.get('/api/process-env', (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID);
})

const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(app.listen(PORT, () => {
  console.log(`server is listenning on ${PORT}`);
})).catch(err => {
  console.log(err);
})





