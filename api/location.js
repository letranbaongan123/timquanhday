const axios = require("axios");

global.locations = global.locations || {};

module.exports = async (req, res) => {

  if (req.method !== "POST") {

    return res.status(405).json({
      error: "Method not allowed"
    });

  }

  try {

    const {
      trackingId,
      lat,
      lng,
      time
    } = req.body;

    global.locations[trackingId] = {
      lat,
      lng,
      time
    };

    const trackingLink =
      `${req.headers.origin}/track.html?id=${trackingId}`;

    const googleMapsLink =
      `https://maps.google.com/?q=${lat},${lng}`;

    const currentTime =
      new Date().toLocaleString("vi-VN");

    const message = `
📍 NGƯỜI DÙNG ĐANG CHIA SẺ HÀNH TRÌNH

🆔 Tracking ID:
${trackingId}

📌 Toạ độ hiện tại:

Latitude:
${lat}

Longitude:
${lng}

🗺 Xem trên Google Maps:
${googleMapsLink}

🔗 Link theo dõi realtime:
${trackingLink}

⏱ Cập nhật lúc:
${currentTime}
`;

    await axios.post(

      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,

      {
        chat_id: process.env.CHAT_ID,
        text: message
      }

    );

    return res.status(200).json({
      success: true
    });

  } catch(error) {

    return res.status(500).json({
      error: error.message
    });

  }

};

