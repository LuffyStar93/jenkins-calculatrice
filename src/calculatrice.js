/**
 * Module de calculatrice pour effectuer des additions
 */

/**
 * Additionne des nombres - accepte soit deux nombres, soit une expression
 * @param {number|string} a - Premier nombre OU expression
 * @param {number} [b] - Deuxième nombre (optionnel)
 * @returns {number} La somme des nombres
 * @throws {Error} Si les paramètres ne sont pas valides
 */
function addition(a, b) {
    // Si le premier paramètre est une string, on traite comme une expression
    if (typeof a === 'string') {
        const expression = a;
        
        if (expression.trim() === '') {
            throw new Error('L\'expression ne peut pas être vide');
        }
        
        // Séparation des nombres par le signe +
        const nombres = expression.split('+').map(nombre => {
            const num = parseFloat(nombre.trim());
            if (isNaN(num)) {
                throw new Error(`"${nombre}" n'est pas un nombre valide`);
            }
            return num;
        });
        
        // Calcul de la somme totale
        return nombres.reduce((somme, nombre) => somme + nombre, 0);
    }
    
    // Sinon, on utilise l'ancienne méthode avec deux nombres
    const nombre1 = parseFloat(a);
    const nombre2 = parseFloat(b);
    
    if (isNaN(nombre1) || isNaN(nombre2)) {
        throw new Error('Les paramètres doivent être des nombres valides');
    }
    
    return nombre1 + nombre2;
}

module.exports = {
    addition
};