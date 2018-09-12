const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
    if (!req.body.phone) {
        res.status(422).send({ error: 'You must provide a phone number '});
    }

    const phone = String(phone).replace(/[^\d]/g, '');
    admin.auth().getUser(phone)
        .then(user => {
            const code = Math.floor((Math.random() * 8999 + 1000));
            twilio.messages.create({
                body: `Your code is ${code}`,
                to: phone,
                from: '+18502047291'
            }, err => {
                if (err) { return res.status(422).send(err); }
                admin.database().ref(`users/${phone}`)
                    .update({ code: code, valid: true }, () => {
                       return res.send({ success: true });
                    })
            })
        })
        .catch(err => {
            res.status(422).send({ error: err});
        })
}
