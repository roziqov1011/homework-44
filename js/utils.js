const $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

const $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

const createElement = function (tagName, className, text) {
  let element = document.createElement(tagName);
  element.setAttribute("class", className);
  if (text) {
    element.textContent = text;
  }

  return element;
};

const getYoutubeVideoLink = function (videoId) {
  return `https://youtube.com/watch?v=${videoId}`;
};

const getYoutubeVideoBigThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
};

const getYoutubeVideoThumbnail = function (videoId) {
  return `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
};
