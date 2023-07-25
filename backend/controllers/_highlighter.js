export const getAllHighlits = async (req, res) => {
  try {
    // fetch and return the data
  } catch (e) {
    res.status(500).json({ msg: "Bad request!! couldnot fetch all highlits" });
  }
};
