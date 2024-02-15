import { Request, Response } from "express";
const { CloudTasksClient } = require("@google-cloud/tasks");
const client = new CloudTasksClient();

export const handleTRXRadio = async (req: Request, res: Response) => {
  const { sessionId, genres, isrcIds } = req.body;

  const project = "trx-traklist";
  const queue = "developer-radio-api";
  const location = "europe-west1"; // e.g., 'us-central1'
  const url =
    "https://europe-west1-trx-traklist.cloudfunctions.net/TRAKLIST_API/trx/radio";

  const queuePath = client.queuePath(project, location, queue);
  const task = {
    httpRequest: {
      httpMethod: "POST",
      url,
      headers: { "Content-Type": "application/json" },
      body: Buffer.from(
        JSON.stringify({ sessionId, genres, isrcIds })
      ).toString("base64"),
    },
    // Schedule time is not specified here, if you want to schedule the task for later,
    // you need to set the `scheduleTime` property.
  };

  try {
    // console.log(`Scheduling task for activityId: ${activityId}`);
    await client.createTask({ parent: queuePath, task });
    console.log("Task scheduled successfully");
    res.json({ message: "Task scheduled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Task scheduling failed" });
    // console.error(`Error scheduling task for activityId: ${activityId}`, error);
  }
};
