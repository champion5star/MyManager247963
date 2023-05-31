const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { MarketingEmail } = require("../models/index/index");
const { SendMail } = require("../service/sendMail");
const { agenda } = require("../Utilities/agenda");
const { findSecondsDifference } = require("../helper/findSecondsDifference");

exports.composeEmail = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const {
      from, toType, to, subject, content, timestamp, scheduled, mailId, attachments
    } = req.body;
    let { emailType } = req.body;
    if (!emailType) {
      emailType = "sent";
    }

    if (!["sent", "draft"].includes(emailType)) {
      return res.status(400).send({
        msg: "Invalid email type",
        success: false,
      });
    }

    if (emailType !== "draft") {
      if (!toType || !to || !subject || !content) {
        return res.status(400).send({
          msg: "Please provide all the required fields",
          success: false,
        });
      }
      if (scheduled && !timestamp) {
        return res.status(400).send({
          msg: "Please provide time for scheduled email",
          success: false,
        });
      }
    }

    let dbObjInstance;
    if (!mailId) {
      dbObjInstance = await MarketingEmail.create({
        userId,
        from,
        toType,
        to,
        subject,
        message: content,
        status: emailType === "sent" && scheduled ? ["scheduled"] : [emailType || "sent"],
        // eslint-disable-next-line no-nested-ternary
        timestamp: scheduled ? timestamp : emailType === "sent" ? Date.now() : null,
        attachments,
      });
    } else {
      dbObjInstance = await MarketingEmail.updateOne(
        {
          _id: mailId,
          userId,
        },
        {
          $set: {
            from,
            toType,
            to,
            subject,
            message: content,
            status: emailType === "sent" && scheduled ? ["scheduled"] : [emailType || "sent"],
            timestamp: scheduled ? timestamp : null,
            attachments,
          },
        },
        { returnDocument: "after" }
      );
    }

    if (emailType === "sent") {
      if (!scheduled) {
        SendMail({
          // from : from  // temporary ignore
          recipient: to,
          subject,
          text: content,
          body: content,
          attachments: attachments.map((attachment) => ({
            filename: attachment.name,
            path: attachment.url,
          })),
        });
      } else {
        const futureDate = new Date(timestamp);
        const secsFromNow = findSecondsDifference(new Date(), futureDate);
        // eslint-disable-next-line no-console
        console.log("secsFromNow", secsFromNow);

        agenda.define(`${dbObjInstance._id}-[SEND_MAIL]`, async () => {
          const mailUpdated = MarketingEmail.findById(dbObjInstance._id).lean();
          if (!mailUpdated || mailUpdated.isDeleted) {
            return;
          }

          const payload = {
            // from : from  // temporary ignore
            recipient: to,
            subject,
            text: content,
            body: content,
            attachments: attachments.map((attachment) => ({
              filename: attachment.name,
              path: attachment.url,
            })),
          };
          // eslint-disable-next-line no-console
          console.log("SENT MAIL", payload);
          SendMail(payload);

          await MarketingEmail.updateOne(
            { _id: dbObjInstance._id },
            { $set: { status: ["sent"] } }
          );
        });

        agenda.schedule(`${secsFromNow} seconds`, `${dbObjInstance._id}-[SEND_MAIL]`);
      }
    }

    return res.status(201).send({ success: true, msg: "Email sent successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("error", error);
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.sendScheduledEmailNow = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { mailId } = req.body;

    const dbObjInstance = await MarketingEmail.findOne({
      _id: mailId,
      userId,
    });

    await agenda.cancel({ name: `${dbObjInstance._id}-[SEND_MAIL]` });

    SendMail({
      // from : from  // temporary ignore
      recipient: dbObjInstance.to,
      subject: dbObjInstance.subject,
      text: dbObjInstance.message,
      body: dbObjInstance.message,
      attachments: dbObjInstance.attachments.map((attachment) => ({
        filename: attachment.name,
        path: attachment.url,
      })),
    });

    await MarketingEmail.updateOne({ _id: dbObjInstance._id }, { $set: { status: ["sent"] } });

    return res.status(201).send({ success: true, msg: "Email sent successfully" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getEmails = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { folder } = req.query;
    const query = { userId, isDeleted: false };
    if (folder === "sent" || folder === "draft" || folder === "scheduled") {
      query.status = folder;
    }
    if (folder === "starred") {
      query.isStarred = true;
    }
    if (folder === "trash") {
      query.isDeleted = true;
    }

    let emails = await MarketingEmail.find(query).sort({ createdAt: -1 }).lean();
    emails = emails.map((email) => ({
      ...email,
      time: email.timestamp || email.createdAt,
    }));

    // const emailsMeta = {
    //   inbox: 4,
    //   draft: 4,
    //   spam: 2,
    // }; // TMP hardcoded data

    let emailsMeta = await MarketingEmail.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          status: { $in: ["draft"] },
        },
      },
      {
        //  separate the documents as the status is an array
        $unwind: "$status",
      },
      {
        //  group the documents by the status
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        //  project the documents to the desired format
        $group: {
          _id: null,
          emailsMeta: {
            $push: {
              status: "$_id",
              count: "$count",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          emailsMeta: {
            $arrayToObject: {
              $map: {
                input: "$emailsMeta",
                as: "emailsMeta",
                in: {
                  k: "$$emailsMeta.status",
                  v: "$$emailsMeta.count",
                },
              },
            },
          },
        },
      },
    ]);

    if (emailsMeta.length) {
      emailsMeta = emailsMeta[0].emailsMeta;
    } else {
      emailsMeta = {
        inbox: 0,
        draft: 0,
        // spam: 0,
      };
    }

    // eslint-disable-next-line no-console
    console.log("emailsMetaActual", emailsMeta);

    return res.status(200).send({ success: true, emails, emailsMeta });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getEmailById = asyncHandler(async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const query = { userId, _id: id };

    const email = await MarketingEmail.findOne(query).lean();
    email.time = email.timestamp || email.createdAt;
    return res.status(200).send(email);
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteEmailsByIds = asyncHandler(async (req, res) => {
  try {
    const { emailIds, folder, isTrash } = req.body;
    const { _id: userId } = req.user;
    const query = { userId, _id: { $in: emailIds } };

    if ((folder !== "trash" && folder !== "scheduled") || isTrash) {
      await MarketingEmail.updateMany(query, { isDeleted: !isTrash });
      return res
        .status(200)
        .send({ success: true, msg: "Emails delete status updated successfully" });
    }
    await MarketingEmail.deleteMany(query);
    if (folder === "scheduled") {
      await agenda.cancel({ name: `${emailIds}-[SEND_MAIL]` });
    }
    return res.status(200).send({ success: true, msg: "Emails permanently deleted successfully" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

// exports.markEmailAsSpam = asyncHandler(async (req, res) => {
//   try {
//     let { emailIds } = req.body;
//     let { _id: userId } = req.user;
//     let query = { userId, _id: { $in: emailIds } };

//     const result = await MarketingEmail.updateMany(query, { isSpam: true });
//     console.log(result);
//     return res.status(200).send({ success: true, msg: "Emails marked as spam successfully" });
//   } catch (error) {
//     return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
//   }
// });

exports.starEmails = asyncHandler(async (req, res) => {
  try {
    const { emailIds, isStarred } = req.body;
    const { _id: userId } = req.user;
    const query = { userId, _id: { $in: emailIds } };

    await MarketingEmail.updateMany(query, { isStarred });
    return res.status(200).send({ success: true, msg: "Emails starred successfully" });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});
