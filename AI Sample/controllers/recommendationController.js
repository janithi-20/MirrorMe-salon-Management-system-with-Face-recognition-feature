import STATIC_DATA from "../data/recommendations.js";

function findStatic(shape) {
  const s = String(shape || "").trim().toLowerCase();
  return STATIC_DATA.find((r) => String(r.faceShape).toLowerCase() === s) || null;
}


export const createRecommendation = async (_req, res) => {

  return res.status(405).json({ message: "Disabled in static data mode" });
};


export const getRecommendation = async (req, res) => {
  try {
    const raw = req.params.shape || "";
    const shape = String(raw).trim(); 
    const data = findStatic(shape);
    if (!data) return res.status(404).json({ message: "No recommendation found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const listRecommendations = async (_req, res) => {
  try {
    return res.json(STATIC_DATA);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
