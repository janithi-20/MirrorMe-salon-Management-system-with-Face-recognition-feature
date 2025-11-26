import STATIC_DATA from "../data/recommendations.js";

function findStatic(shape) {
  const s = String(shape || "").trim().toLowerCase();
  return STATIC_DATA.find((r) => String(r.faceShape).toLowerCase() === s) || null;
}

// Create (for Postman)
export const createRecommendation = async (_req, res) => {
  // Static-only API: writes disabled
  return res.status(405).json({ message: "Disabled in static data mode" });
};

// Read by face shape (for frontend)
export const getRecommendation = async (req, res) => {
  try {
    const raw = req.params.shape || "";
    const shape = String(raw).trim(); // e.g. "Oval"
    const data = findStatic(shape);
    if (!data) return res.status(404).json({ message: "No recommendation found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: list all (for debugging in Postman)
export const listRecommendations = async (_req, res) => {
  try {
    return res.json(STATIC_DATA);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
