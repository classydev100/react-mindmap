/* eslint no-bitwise:off */
// Return an emoji as a GitHub image.
const emojiTemplate = unicode =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/${unicode}.png">`;

const customEmojiTemplate = emoji =>
  `<img class="mindmap-emoji" src="https://assets-cdn.github.com/images/icons/emoji/${emoji}.png">`;

// Regex that matches all emojis in a string.
const matchEmojis = /([\uD800-\uDBFF][\uDC00-\uDFFF])/g;

/* Convert all emojis in an HTML string to GitHub images.
 * The bitwise magic is explained at:
 *    http://crocodillon.com/blog/parsing-emoji-unicode-in-javascript
 */
const emojiToHTML = html =>
  html.replace(matchEmojis, (match) => {
    if (match === '🐙') {
      return customEmojiTemplate('octocat');
    }
    if (match === '🤖') {
      return '<img class="mindmap-emoji reddit-emoji" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNpOQVZdTCyVamjJPl92KjaDHigNWVM8mOLHPRU4DHoVNJWxCg">';
    }
    if (match === '🗂') {
      return '<img class="mindmap-emoji" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4">';
    }

    // Keep the first 10 bits.
    const lead = match.charCodeAt(0) & 0x3FF;
    const trail = match.charCodeAt(1) & 0x3FF;

    // 0x[lead][trail]
    const unicode = ((lead << 10) + trail).toString(16);

    return emojiTemplate(`1${unicode}`);
  });

/*
 * Return a string corresponding to the category represented
 * by the given emoji.
 */
const emojiToCategory = (emoji) => {
  switch (emoji) {
    case '🗺':
      return 'mindmap';

    case '🌐':
      return 'wiki';

    case '🗂':
      return 'stack exchange';

    case '📖':
      return 'free book';

    case '📕':
      return 'non-free book';

    case '📄':
      return 'paper';

    case '👀':
      return 'video';

    case '🖋':
      return 'article';

    case '🗃':
      return 'blog';

    case '🐙':
      return 'github';

    case '👾':
      return 'interactive';

    case '🖌':
      return 'image';

    case '🎙':
      return 'podcast';

    case '📮':
      return 'newsletter';

    case '🗣':
      return 'chat';

    case '🎥':
      return 'youtube';

    case '🤖':
      return 'reddit';

    default:
      return '';
  }
};

module.exports = {
  matchEmojis,
  emojiToHTML,
  emojiToCategory,
};
