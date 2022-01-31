const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schema/index");
const { authMiddleware } = require("./utils/auth");
const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// this was also added for the face api
const viewsDir = path.join(__dirname, "views");
app.use(express.static(viewsDir));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "../images")));
app.use(express.static(path.join(__dirname, "../media")));
app.use(express.static(path.join(__dirname, "../../weights")));
app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/", (req, res) => res.redirect("/face_detection"));
app.get("/face_detection", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceDetection.html"))
);
app.get("/face_landmark_detection", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceLandmarkDetection.html"))
);
app.get("/face_expression_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceExpressionRecognition.html"))
);
app.get("/age_and_gender_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "ageAndGenderRecognition.html"))
);
app.get("/face_extraction", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceExtraction.html"))
);
app.get("/face_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "faceRecognition.html"))
);
app.get("/video_face_tracking", (req, res) =>
  res.sendFile(path.join(viewsDir, "videoFaceTracking.html"))
);
app.get("/webcam_face_detection", (req, res) =>
  res.sendFile(path.join(viewsDir, "webcamFaceDetection.html"))
);
app.get("/webcam_face_landmark_detection", (req, res) =>
  res.sendFile(path.join(viewsDir, "webcamFaceLandmarkDetection.html"))
);
app.get("/webcam_face_expression_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "webcamFaceExpressionRecognition.html"))
);
app.get("/webcam_age_and_gender_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "webcamAgeAndGenderRecognition.html"))
);
app.get("/bbt_face_landmark_detection", (req, res) =>
  res.sendFile(path.join(viewsDir, "bbtFaceLandmarkDetection.html"))
);
app.get("/bbt_face_similarity", (req, res) =>
  res.sendFile(path.join(viewsDir, "bbtFaceSimilarity.html"))
);
app.get("/bbt_face_matching", (req, res) =>
  res.sendFile(path.join(viewsDir, "bbtFaceMatching.html"))
);
app.get("/bbt_face_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "bbtFaceRecognition.html"))
);
app.get("/batch_face_landmarks", (req, res) =>
  res.sendFile(path.join(viewsDir, "batchFaceLandmarks.html"))
);
app.get("/batch_face_recognition", (req, res) =>
  res.sendFile(path.join(viewsDir, "batchFaceRecognition.html"))
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// this is added for the face api
app.post("/fetch_external_image", async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).send("imageUrl param required");
  }
  try {
    const externalResponse = await request(imageUrl);
    res.set("content-type", externalResponse.headers["content-type"]);
    return res.status(202).send(Buffer.from(externalResponse.body));
  } catch (err) {
    return res.status(404).send(err.toString());
  }
});

app.listen(3000, () => console.log("Listening on port 3000!"));

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function (resolve, reject) {
    const options = Object.assign(
      {},
      {
        url,
        isBuffer: true,
        timeout,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
        },
      },
      returnBuffer ? { encoding: null } : {}
    );

    get(options, function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
