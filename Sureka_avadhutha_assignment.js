class URLShortener {
  constructor() {
    this.urlMappings = {};
    this.baseUrl = "https://short.url/";
    this.shortCodeLength = 6;
    this.characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }

  generateShortCode() {
    let shortCode = "";
    for (let i = 0; i < this.shortCodeLength; i++) {
      const randomIndex = Math.floor(Math.random() * this.characters.length);
      shortCode += this.characters[randomIndex];
    }
    return shortCode;
  }

  encodeURL(longURL) {
    if (!longURL) {
      throw new Error("Invalid input URL");
    }

    let shortCode;
    do {
      shortCode = this.generateShortCode();
    } while (this.urlMappings[shortCode]);

    this.urlMappings[shortCode] = longURL;

    return this.baseUrl + shortCode;
  }

  decodeURL(shortenedURL) {
    if (
      typeof shortenedURL !== "string" ||
      !shortenedURL.startsWith(this.baseUrl)
    ) {
      throw new Error("Invalid shortened URL");
    }

    const shortCode = shortenedURL.slice(this.baseUrl.length);
    const longURL = this.urlMappings[shortCode];

    if (!longURL) {
      throw new Error("Shortened URL not found");
    }

    return longURL;
  }
}

const shortener = new URLShortener();

const longURL = "https://www.example.com/very/long/url/to/test/url-shortening";
const shortenedURL = shortener.encodeURL(longURL);
console.log("Shortened URL:", shortenedURL);

const redirectedURL = shortener.decodeURL(shortenedURL);
console.log("Redirected URL:", redirectedURL);
