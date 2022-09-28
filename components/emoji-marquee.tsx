const EmojiMarquee = () => (
  <div className="relative flex overflow-x-hidden">
    <div className="py-4 animate-marquee whitespace-nowrap">
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
    </div>

    <div className="absolute top-0 py-4 animate-marquee2 whitespace-nowrap">
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
      <span className="text-4xl mx-4">🌝</span>
      <span className="text-4xl mx-4">🌚</span>
    </div>
  </div>
)

export default EmojiMarquee
