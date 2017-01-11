const RapidAPI = new require('rapidapi-connect');
const rapid = new RapidAPI('EmotionSpotify', '#########################');
let open = require('open');

let imageUrl = process.argv[2];

rapid.call('MicrosoftEmotionAPI', 'getEmotionRecognition', {
  // Your Microsfot EmotionAPI substription key (See Docs: https://rapidapi.com/package/MicrosoftEmotionAPI/docs)
	'subscriptionKey': '###########################',
  // This is the URL of the facial image to be interpeated
	'image': imageUrl

}).on('success', (payload) => {
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

  }).on('success', (payload) => {
     // A JSON object is returned containing information about the playlist including the name, URL, and owner.
     // Here I have grabbed the playlist's URL and opened it in the browser using the npm package "open"
	   open(payload.playlists.items[0].external_urls.spotify);
  }).on('error', (payload) => {
	   console.log("Spotify Playlist Query Error");
  });
}).on('error', (payload) => {
  console.log("Microsoft Emotion Error");
});
