import { Connection } from './index';

// For your accesstokens table, make sure you can findOneByIdAndToken, insert, and update a token at a minimum
export const getTokenByID = async (id: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * FROM accesstokens WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

// For your accesstokens table, make sure you can findOneByIdAndToken, insert, and update a token at a minimum
export const getToken = async (id: string, token: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('SELECT * FROM accesstokens WHERE id = ? & token = ?', [id, token], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}

export const addToken = async (authorid: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('INSERT INTO accesstokens (authorid, token) VALUES (?, ?)', [authorid, token], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}
// update by id??
export const updateToken = async (token: string, id: string) => {
    return new Promise((resolve, reject) => {
        Connection.query('UPDATE accesstokens SET token = ? WHERE id = ?', [token, id], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
}


export default {
    getToken, getTokenByID, addToken, updateToken
}