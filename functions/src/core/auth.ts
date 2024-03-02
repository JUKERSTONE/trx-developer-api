import { handleUpdateClientSecret } from "../auth/updateClientSecret";

export const auth = (req: any, res: any, next: any) => {
  let clientId;
  if (
    req.headers.client_secret &&
    req.headers.client_secret.startsWith("DMG ")
  ) {
    clientId = req.headers.authorization.split("DMG ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  handleUpdateClientSecret({ clientId, hasRefresh: false })
    .then(next)
    .catch(() => {
      res.status(403).json({ error: "Unauthorized" });
    });
};
