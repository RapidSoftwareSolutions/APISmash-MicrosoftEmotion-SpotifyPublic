# APISmash MicrosoftEmotionAPI-SpotifyPublicAPI

This script was built to demonstrate how quickly one can use RapidAPI to do something cool! The script uses the MicrosoftEmotionAPI as facial recognition software to asses the emotion of a face in an image. It then uses the SpotifyPublicAPI to find a playlist that contains that emotion in the title.

## Instructions

1. Obtain your MicrosoftEmotionAPI subscription key. (Go here for more details: https://rapidapi.com/package/MicrosoftEmotionAPI/docs)
2. git clone https://github.com/davidnoah/Emotion-Spotify-Smash.git
3. In script.js, paste your subscription key into the appropriate field.
3. npm install
4. node script.js https://wallpaperscraft.com/image/beyonce_smile_face_lips_hair_5905_1280x1024.jpg (This URL can point to any facial image you want to use, as an example, an image of Beyonce smiling is provided)

## MicrosoftEmotionAPI
### Input:
![Beyonce Smiling](https://wallpaperscraft.com/image/beyonce_smile_face_lips_hair_5905_1280x1024.jpg)

### Output:
"happiness"

## SpotifyPublicAPI
### Input:
"happiness"

### Output:
- Playlist name: Happy Hits!
- External URL: http://open.spotify.com/user/spotify/playlist/65V6djkcVRyOStLd8nza8E
- Owner: Spotify
- Tracks: 50
