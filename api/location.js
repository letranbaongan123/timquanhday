const axios = require('axios');

module.exports = async (req, res) => {

  if(req.method !== 'POST'){

    return res.status(405).json({
      error:'Method not allowed'
    });

  }

  try {

    const {
      trackingId,
      lat,
      lng
    } = req.body;

    const trackingLink =
      `${req.headers.origin}/track.html?id=${trackingId}`;

    const googleMapsLink =
      `https://maps.google.com/?q=${lat},${lng}`;

    const message = `
📍 HÀNH TRÌNH REALTIME

🆔 ID:
${trackingId}

📌 Latitude:
${lat}

📌 Longitude:
${lng}

🗺 Google Maps:
${googleMapsLink}

🔗 Theo dõi realtime:
${trackingLink}
`;

    await axios.post(

      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,

      {
        chat_id: process.env.CHAT_ID,
        text: message
      }

    );

    return res.status(200).json({
      success:true
    });

  } catch(error){

    return res.status(500).json({
      error:error.message
    });

  }

};
