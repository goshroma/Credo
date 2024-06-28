const natural = require('natural');
const TfIdf = natural.TfIdf;
const vector = require('vector-object');
const { NGOEvent } = require('../modelLoader');
function cosineSimilarity(vec1, vec2) {
  return vector.dotProduct(vec1, vec2) / (vector.magnitude(vec1) * vector.magnitude(vec2));
}

async function getRecommendations(userPreferences) {
  const events = await NGOEvent.find();
  const tfidf = new TfIdf();

  events.forEach((event, index) => {
    const eventFeatures = `${event.cause.join(' ')} ${event.location.city} ${event.location.state} ${event.location.country} ${event.requiredSkills.join(' ')}`;
    tfidf.addDocument(eventFeatures);
  });

  const userPreferencesString = `${userPreferences.causes.join(' ')} ${userPreferences.location.city} ${userPreferences.location.state} ${userPreferences.location.country} ${userPreferences.skills.join(' ')}`;
  tfidf.addDocument(userPreferencesString);

  const similarities = events.map((event, index) => {
    const similarity = cosineSimilarity(tfidf.getVector(index), tfidf.getVector(events.length));
    return { event, similarity };
  });

  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.slice(0, 5).map(item => item.event);
}

module.exports = { getRecommendations };


  