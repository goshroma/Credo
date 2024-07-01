async function getRecommendations(userPreferences, selectedDate) {
  const events = await NGOEvent.find({ date: { $gte: selectedDate } }); 

  const tfidf = new TfIdf();

  events.forEach((event, index) => {
    const eventFeatures = `${event.cause.join(' ')} ${event.location.city} ${event.location.state} ${event.location.country} ${event.requiredSkills.join(' ')}`;
    tfidf.addDocument(eventFeatures);
  });

  const userPreferencesString = `${userPreferences.causes.join(' ')} ${userPreferences.location.city} ${userPreferences.location.state} ${userPreferences.location.country} ${userPreferences.skills.join(' ')}`;
  tfidf.addDocument(userPreferencesString);

  const similarities = events.map((event, index) => {
    const similarity = cosineSimilarity(tfidf.getVector(index), tfidf.getVector(events.length));
    const daysDifference = Math.abs((new Date(event.date) - new Date(selectedDate)) / (1000 * 60 * 60 * 24));
    const dateWeight = 1 / (1 + daysDifference); 
    return { event, score: similarity * dateWeight };
  });

  similarities.sort((a, b) => b.score - a.score); 

  return similarities.slice(0, 5).map(item => item.event); 
}

module.exports = { getRecommendations };