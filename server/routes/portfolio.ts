import { RequestHandler } from "express";
import fs from "fs/promises";
import path from "path";
import { PortfolioData, initialData } from "../../shared/portfolio-data";

const DATA_FILE = path.join(process.cwd(), "portfolio.json");

async function readData(): Promise<PortfolioData> {
  try {
    const content = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return initialData;
  }
}

async function writeData(data: PortfolioData) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export const getPortfolio: RequestHandler = async (req, res) => {
  try {
    const data = await readData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to read portfolio data" });
  }
};

export const updatePortfolio: RequestHandler = async (req, res) => {
  try {
    const newData = req.body;
    await writeData(newData);
    res.json({ success: true, data: newData });
  } catch (error) {
    res.status(500).json({ error: "Failed to save portfolio data" });
  }
};
