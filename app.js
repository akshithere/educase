const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');
const sequelize = require('./db');
require('./models/School');       

dotenv.config();
const app = express();
app.use(express.json());

app.use('/', schoolRoutes);

// Sync Sequelize models with DB
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Database synced successfully');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to sync database:', err);
  });
