const db = require('../config/db');
const sendEnquiryMail = require('../utils/mailer');

exports.saveEnquiry = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const { type, productMapId } = req.body;
        if (productMapId && productMapId.length > 0) {
            await conn.beginTransaction();
            const [enquiryResult] = await conn.query(
                `INSERT INTO tbl_enquiry (json_data, type) VALUES (?, ?)`,
                [JSON.stringify(req.body), type]
            );
            const enquiryId = enquiryResult.insertId;

            const values = productMapId.map(id => [id, enquiryId]);
            await conn.query(
                `INSERT INTO tbl_enquiry_product_mapping (product_category_map_id, enquiryId) VALUES ?`,
                [values]
            );

            await conn.commit();
            res.json({ data: "Successfully added", enquiryId });
        } else { res.status(400).json({ data: "productMapId required"}) }

        const emailText = Object.entries(req.body).map(([key, value]) => `${key}:${value}`).join("\n")
        sendEnquiryMail(emailText).catch(err => console.error("Mail error:", err));

    } catch (e) {
        if (conn) await conn.rollback();
        console.error("DB error:", e);
        res.status(500).json({ data: "Failed", error: e.message });
    } finally {
        if (conn) conn.release();
    }
};

exports.getEnquiryList = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const [result] = await conn.query(`select json_data from tbl_enquiry te where te.deletedAt is null`);
        const enqList = result.map(e => e.json_data);
        res.json({ data: enqList });
    } catch (e) {
        console.error("DB error:", e);
        res.status(500).json({ data: "Failed", error: e.message });
    } finally {
        if (conn) conn.release();
    }
}