class StringHelper {
  static capitalizeString(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  static desktopControls(str) {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 640) {
      return "";
    } else {
      return ` (${str})`;
    }
  }
}

export default StringHelper;
