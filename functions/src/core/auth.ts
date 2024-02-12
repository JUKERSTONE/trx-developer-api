import { fbFirestore, fbAuthentication } from "./firebase";

export const auth = (req: any, res: any, next: any) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("No token found");
    return res.status(403).json({ error: "Unauthorized" });
  }

  fbAuthentication
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      console.log(decodedToken);
      return fbFirestore
        .collection("users")
        .where("id", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      req.user.username = data.docs[0].data().user_name;
      req.user.userId = data.docs[0].data().id;
      req.user.forchainId = data.docs[0].data().forchainId;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token ", err);
      return res.status(400).json(err);
    });
};
