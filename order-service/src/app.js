const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
res.send('API Gateway is running');
});

// Products route
app.get('/products', async (req, res) => {
try {
const response = await axios.get('http://product-service:8082/products');
res.json(response.data);
} catch (error) {
console.error('Error fetching products:', error.message);
res.status(500).json({
error: 'Failed to fetch products'
});
}
});

// Users route
app.get('/users', async (req, res) => {
try {
const response = await axios.get('http://user-service:8081/users');
res.json(response.data);
} catch (error) {
console.error('Error fetching users:', error.message);
res.status(500).json({
error: 'Failed to fetch users'
});
}
});

// Order route
app.post('/order', async (req, res) => {
try {
console.log('Incoming order request:', req.body);

```
const response = await axios.post(
  'http://order-service:8083/order',
  req.body
);

console.log('Response from order-service:', response.data);

res.json(response.data);
```

} catch (error) {
console.error('Error calling order-service:', error.message);
res.status(500).json({
error: 'Order processing failed'
});
}
});

// Start server
const PORT = 8080;

app.listen(PORT, () => {
console.log(`API Gateway running on port ${PORT}`);
});
