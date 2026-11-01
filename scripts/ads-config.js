// Google Ads conversion tracking. Fill these in from Google Ads → Goals → Conversions → (action) → Tag setup → "Install the tag yourself".
// id looks like "AW-1234567890"; each label looks like "AbC-D_efG-h12_34-567".
// Leave a label empty to skip that conversion. Leave id empty to disable tracking entirely.
module.exports = {
  id: '',
  labels: {
    lead: '',      // quote form submitted (fires on /thank-you.html)
    whatsapp: '',  // click on any WhatsApp link
    call: '',      // click on any tel: link
    booking: '',   // click on the Google Calendar booking link
  },
};
