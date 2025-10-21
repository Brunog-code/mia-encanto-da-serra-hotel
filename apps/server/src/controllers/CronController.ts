import { Request, Response } from "express";
import { cancelOldReservations } from "../jobs/cancelOldReservations.js";

export class CronController {
  public cancelOldReservations = async (req: Request, res: Response) => {
    try {
      await cancelOldReservations();
      return res.status(200).json({ message: "Job executado com sucesso!" });
    } catch (error) {
      console.error("Erro ao executar o job", error);
      return res.status(500).json({ message: "Erro ao executar o job" });
    }
  };
}
