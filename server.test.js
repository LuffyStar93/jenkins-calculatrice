    const request = require('supertest');
    const app = require('./server'); // ou le chemin vers ton serveur Express

    describe('GET /', () => {
    it('devrait retourner la page HTML', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/html/);
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

    it('devrait accepter des chaînes numériques', async () => {
        const res = await request(app)
        .post('/api/addition')
        .send({ nombre1: "4", nombre2: "7" });
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
        const res = await request(app)
        .post('/api/addition')
        .send({ nombre1: "abc", nombre2: "def" });
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
        .send();
        expect(res.status).toBe(400);
        expect(res.body.erreur).toBeDefined();
    });

    it('devrait gérer les additions chaînées de type 1+1+1+1+1+1+1+1', async () => {
        const res = await request(app)
        .post('/api/addition')
        .send({ expression: "1+1+1+1+1+1+1+1" });
        expect(res.status).toBe(200);
        expect(res.body.resultat).toBe(8);
    });
    });