const db = require("../config/db");

exports.getDataCounts = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const [enquiryCount] = await conn.query(`select type,count(*) as count from tbl_enquiry te where te.deletedAt is null group by te.type`);
        const [productCount] = await conn.query(`select count(*) as count from tbl_products tp  where tp.deletedAt is null`);
        const [categoryCount] = await conn.query(`select COUNT(*) as count from tbl_category tc where tc.deletedAt is null`);
        const enquiryData = {}
        enquiryCount.forEach(e => { enquiryData[e.type] = e.count })
        const countData = { enquiryCount: enquiryData, productCount: productCount[0].count, categoryCount: categoryCount[0].count }
        res.json({ data: countData })

    } catch (e) {
        console.error(e);
        res.status(500).json({ data: "failed", error: e.message });
    } finally {
        if (conn) conn.release();
    }
}
exports.getEnqCountDateWise = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const [rows] = await conn.query(`SELECT 
    DATE_FORMAT(te.createdAt, '%Y-%m-%d') AS date,
    COUNT(*) AS count
FROM tbl_enquiry te
WHERE te.deletedAt IS NULL
GROUP BY DATE_FORMAT(te.createdAt, '%Y-%m-%d')
ORDER BY date;
`)
        res.json({ data: rows })
    } catch (e) {
        console.error(e);
        res.status(500).json({ data: "failed", error: e.message });
    } finally {
        if (conn) conn.release();
    }
}