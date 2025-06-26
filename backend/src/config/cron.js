import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function() {
    https.get(process.env.API_URL, (res) => {
        if(res.statusCode === 200) console.log("Cron job executed successfully");
        else console.log("Cron job failed with status code:", res.statusCode);
    }).on("error", (e) => console.error("Error while sending request:", e));
});

export default job;

//CRON JOB
//this is used for render.com to run a cron job every 14 minutes
// This cron job runs every 14 minutes and sends a GET request to the specified API URL.
// It logs a success message if the request is successful, or an error message if it fails

// to send the request.
// To use this cron job, you need to set the API_URL environment variable to the URL you want to hit.
// You can start the cron job by calling job.start() in your server initialization code.
// Make sure to handle any potential errors in the request and log them appropriately.
// This is useful for tasks like refreshing data, checking service health, or triggering periodic updates.
//// Ensure that the cron job is running in a suitable environment where it can execute periodically.
// You can also adjust the cron expression to change the frequency of execution as needed.
// For example, "*/14 * * * *" means every 14 minutes. Adjust it according to your requirements.
// Make sure to test the cron job in a development environment before deploying it to production.

//! MINUTE, HOUR, DAY OF MONTH, MONTH, DAY OF WEEK
// example
//* 14 * * * * - This cron job runs every 14 minutes
//* 0 0 * * 0 - This cron job runs every Sunday at midnight
//* 30 3 15 * * - This cron job runs at 3:30 AM on the 15th of every month
//* 0 0 1 1 * - This cron job runs at midnight on January 1st every year
//* 0 * * * * - This cron job runs every hour on the hour