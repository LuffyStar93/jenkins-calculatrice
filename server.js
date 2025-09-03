const express = require('express');
const path = require('path');
const calculatrice = require('./src/calculatrice');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route API pour l'addition
app.post('/api/addition', (req, res) => {
  const { nombre1, nombre2, expression } = req.body;

  if (expression !== undefined) {
    // Sécurité : n'accepte que chiffres et +
    if (!/^[\d+\s.]+$/.test(expression)) {
      return res.status(400).json({ erreur: 'Expression invalide' });
    }
    const total = expression
      .split('+')
      .map(s => parseFloat(s.trim()))
      .reduce((a, b) => a + b, 0);
    return res.status(200).json({ resultat: total });
  }

  if (nombre1 === undefined || nombre2 === undefined) {
    return res.status(400).json({ 
      erreur: 'Veuillez fournir deux nombres' 
    });
  }

  try {
    const resultat = calculatrice.addition(nombre1, nombre2);
    res.json({ resultat });
  } catch (error) {
    res.status(400).json({ 
      erreur: error.message 
    });
  }
});

// Démarrage du serveur
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}

module.exports = app;
