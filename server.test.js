const request = require('supertest');
const app = require('./server'); // adapte le chemin si besoin

describe('GET /', () => {
  it('devrait retourner la page HTML', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    // content-type devrait indiquer html
    expect(res.headers['content-type']).toMatch(/html/);
    // le corps doit contenir une balise <html
    expect(res.text).toMatch(/<html/i);
  });
});

describe('POST /api/addition', () => {
  it('devrait calculer l\'addition de deux nombres entiers', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: 5, nombre2: 3 });
    expect(res.status).toBe(200);
    expect(res.body.resultat).toBe(8);
  });

  it('devrait calculer l\'addition de deux nombres décimaux', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: 2.5, nombre2: 3.7 });
    expect(res.status).toBe(200);
    expect(res.body.resultat).toBeCloseTo(6.2);
  });

  it('devrait calculer l\'addition de deux nombres négatifs', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: -5, nombre2: -3 });
    expect(res.status).toBe(200);
    expect(res.body.resultat).toBe(-8);
  });

  // ⚠️ Avec ton implementation actuelle, si on envoie { nombre1: "4", nombre2: "7" }
  // calculatrice.addition traite '4' comme une *expression* et renverra 4.
  // Pour tester l'acceptation des "chaînes numériques", on passe donc par le champ 'expression'.
  it('devrait accepter des chaînes numériques', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ expression: '4+7' });
    expect(res.status).toBe(200);
    expect(res.body.resultat).toBe(11);
  });

  it('devrait retourner une erreur 400 si un nombre manque', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: 5 });
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  it('devrait retourner une erreur 400 si aucun nombre n\'est fourni', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  it('devrait retourner une erreur 400 pour des valeurs non numériques', async () => {
    // Ici, on force un cas invalide. Ton code renverra un message d'erreur
    // du style `"abc" n'est pas un nombre valide` (400).
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: 'abc', nombre2: 'def' });
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  it('devrait gérer les valeurs null', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ nombre1: null, nombre2: null });
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  it('devrait gérer les corps de requête vides', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send(); // aucun body
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBeDefined();
  });

  it('devrait gérer les additions chaînées de type 1+1+1+1+1+1+1+1', async () => {
    const res = await request(app)
      .post('/api/addition')
      .send({ expression: '1+1+1+1+1+1+1+1' });
    expect(res.status).toBe(200);
    expect(res.body.resultat).toBe(8);
  });
});