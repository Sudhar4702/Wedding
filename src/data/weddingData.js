export const weddingData = {
  brideName: 'Rajkamal',
  groomName: 'Nikitha',

  weddingDate: '25th October 2026',
  weddingDateISO: '2026-10-25T00:00:00',
  weddingTime: '04:30 AM to 06:00 AM',
  weddingVenue: 'Arulmigu Karapuranathar Temple',
  weddingAddress: 'NH47, Uthamasolapuram, Neykkarappatti, Tamil Nadu 636010, India',
  weddingSubtitle: 'With the blessings of our families',

  receptionDate: '24th October 2026',
  receptionTime: '07:00 PM to 10:00 PM',
  receptionVenue: 'Ponnusamy Gounder Thirumana Mandapam',
  receptionAddress: '76, SKS Hospital Road, Fairlands / Alagapuram, Salem - 636004, Tamil Nadu',
  receptionSubtitle: 'Join us for the celebration',

  invitationMessage: 'We warmly invite you to celebrate our special day with us.',
}

export const VENUES = {
  wedding: {
    title: 'Wedding',
    subtitle: weddingData.weddingSubtitle,
    venue: weddingData.weddingVenue,
    date: weddingData.weddingDate,
    time: weddingData.weddingTime,
    address: weddingData.weddingAddress,
  },
  reception: {
    title: 'Reception',
    subtitle: weddingData.receptionSubtitle,
    venue: weddingData.receptionVenue,
    date: weddingData.receptionDate,
    time: weddingData.receptionTime,
    address: weddingData.receptionAddress,
  },
}
