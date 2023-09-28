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
    try {
        const { id } = req.params;
        const chargeId = await connection("charge").where('id', id).first();

        if (!chargeId) {
            return res.status(404).json({ mesagem: "Cobrança não encontrada" })
        }

        return res.status(200).json(chargeId);
    } catch (error) {
        console.log(error);
    }
}


const getCharge = async (req, res) => {

    try {
        const charge = await connection("charge").select(
            'charge.*',
            'customers.name'
        )
            .from('charge')
            .join('customers', 'charge.idcustomer', 'customers.id');

        if (!charge) {
            return res.status(404).json("Cobrança não encontrada!");
        }

        return res.status(200).json(charge);
    } catch (error) {
        console.log(error);
    }
}

const putCharge = async (req, res) => {
    const {
        idcustomer,
        value,
        duedate,
        status,
        description
    } = req.body
    const { id } = req.params;
    try {
        const chargeExist = await connection("charge").where({ id }).first()
        if (!chargeExist) {
            return res.status(404).json({ message: "Cobrança não encontrada" });
        }
        const chargeUpdate = await connection("charge").where({ id })
            .update({
                idcustomer,
                value,
                duedate,
                status,
                description
            }).returning("*");

        if (!chargeUpdate) {
            return res.status(400).json({ message: "Erro ao atualizar a cobrança" });
        }
        return res.status(200).json({ message: "Cobrança atualizada com sucesso!" });
    } catch (error) {

        return res.status(500).json("Erro interno do servidor");
    }
}



module.exports = { postCharge, getCharge, getChargeId, putCharge }