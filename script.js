const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('EmotionSpotify', 'acb14e1a-731a-4c2c-89d9-777c4d9523cc');

rapid.call('MicrosoftEmotionAPI', 'getEmotionRecognition', {
  // Your Microsfot EmotionAPI substription key (See Docs: https://rapidapi.com/package/MicrosoftEmotionAPI/docs)
	'subscriptionKey': '4e23f3364b974e38bbb3c53c063f63cf',
  // This is the URL of the facial image to be interpeated
	'image': 'https://wallpaperscraft.com/image/beyonce_smile_face_lips_hair_5905_1280x1024.jpg'

}).on('success', (payload)=>{
  // The MicrosoftEmotionAPI returns a confidence score for happiness, sadness, surprise, anger, fear, contempt, disgust or neutral.
  // The emotion detected should be interpreted as the emotion with the highest score, as scores are normalized to sum to one.
  // I built a simple loop to find the emotion detected.
  let scores = payload[0].scores;
  let strongestEmotion = "";
  let emotionScore = 0;
  for (var key in scores) {
    if (scores[key] > emotionScore) {
      emotionScore = scores[key];
      strongestEmotion = key;
    }
  }

  rapid.call('SpotifyPublicAPI', 'searchPlaylists', {
  // strongestEmotion should now equal the emotion detected in the photo
	'query': strongestEmotion,
	'market': '',
  // I limit the results to 1 for simplicity. For this test, I'm just returning the top result
	'limit': '1',
	'offset': ''

  }).on('success', (payload)=>{
     // A JSON object is returned containing the name, URL, owner of the playlist.
	   console.log(payload.playlists.items);
  }).on('error', (payload)=>{
	   console.log("Spotify Playlist Query Error");
  });
}).on('error', (payload)=>{
  console.log("Microsoft Emotion Error");
});
