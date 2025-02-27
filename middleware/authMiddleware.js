import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({error: 'Access Denied!'});
    }

    try {
        //decodifica utilizando a func 'verify' do jwt, passando o token pego na req acima e passando um segundo param q indicado q 'este é a secret key'
        const decoded = jwt.verify(token, 'you-secret-key');
        //como em nosso app é o Médico q irá ter essa func de decodificar para alterar infos, buscamos o id dele 
        req.doctorId = decoded.doctorId;
        //e em seguida passamos o 'next(), que é uma func de callback no Express.js q passa o controle para o próximo middleware ou rota
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token!'});
    }
};

export default verifyToken;