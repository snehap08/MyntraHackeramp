const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./utils/errorHandler');
const authRoutes = require('./routes/authRoutes');
const { MONGODB_URI, PORT } = require('./config/dbConfig');

const cosineSimilarity = require('compute-cosine-similarity');
const Product = require('./models/Product'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));



app.use('/api/auth', authRoutes);


const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const viewRoute = require("./routes/viewHistoryRoutes");

app.use('/api/view', viewRoute);

const data = [];


fs.createReadStream(path.join(__dirname, 'data/products.csv'))
  .pipe(csv())
  .on('data', (row) => {
    
    const name = row.name;
    const description = row.description;
    

    
    data.push({ name, description });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    
  })
  .on('error', (error) => {
    console.error('Error processing CSV file:', error);
  });


const tokenizeStem = (text) => {
  
  return text.toLowerCase().split(/\s+/);
};


const padArray = (arr, length) => {
  while (arr.length < length) {
    arr.push(0);
  }
  return arr;
};


app.post('/search', async (req, res) => {
  try {
   
    const query = req.body.query;
    console.log('Query:', query);

    
    const stemmedQuery = tokenizeStem(query);

    
    const results = data.map(product => {
      const productText = `${product.name} ${product.description}`;
      const stemmedProductText = tokenizeStem(productText);

   
      const maxLength = Math.max(stemmedQuery.length, stemmedProductText.length);
      const paddedQuery = padArray(stemmedQuery, maxLength);
      const paddedProductText = padArray(stemmedProductText, maxLength);

      const similarity = cosineSimilarity(paddedQuery, paddedProductText);
      console.log("Similarity:", similarity);
      return { ...product, similarity }; 
    });

    
    results.sort((a, b) => b.similarity - a.similarity);

    
    res.json({ products: results.slice(0, 10) });
  } catch (error) {
    
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use(errorHandler);


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
