function randomInt(min, max) {
  var multiplier = max - min;
  return min + Math.floor(Math.random() * multiplier);
}

function randomString() {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  let word = "";
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 4) word += vowels[randomInt(0, vowels.length)];
    else word += consonants[randomInt(0, consonants.length)];
  }
  return word;
}

let throwaway = {
  generate() {
    var words = [];
    for (let i = 0; i < 3; i++) {
      words.push(randomString());
    }
    return words.join("-");
  },

  getInboxUrl(prefix, service) {
    switch (service) {
      case "mailinator":
        return `https://www.mailinator.com/v3/index.jsp?zone=public&query=${prefix}`;
      case "maildrop":
        return `https://maildrop.cc/inbox/${prefix}`;
      default:
        break;
    }
  },

  getServiceDomain(service) {
    switch (service) {
      case "mailinator":
        return "mailinator.com";
      case "maildrop":
        return "maildrop.cc";
      default:
        break;
    }
  },

  defaultService: "mailinator",
};

export default throwaway;
