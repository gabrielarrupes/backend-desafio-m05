const connection = require("../services/connection");


const postCharge = async (req, res) => {

    const {
        idcustomer,
        value,
        duedate,
        status,
        description
    } = req.body;

    try {
        const charge = await connection("charge").insert({
            idcustomer,
            value,
            duedate,
            status,
            description
        });

        if (!charge) {
            return res.status(400).json("Não foi possível concluir o cadastro de cobrança");
        }

        return res.status(201).json("Cobrança cadastrada com sucesso.");
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

const getChargeId = async (req, res) => {
    const idcustomer = req.params.id;
    try {
        const charge = await connection("charge").where({ idcustomer });

        if (!charge) {
            return res.status(404).json("Cobrança não encontrada!");
        }

        return res.status(200).json(charge);
    } catch (error) {
        console.log(error);
    }
}
const getCharge = async (req, res) => {

    try {
        const result = await connection("charge")

        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}



module.exports = { postCharge, getChargeId, getCharge }