const toHex = (buffer) =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const md5 = (string) => {
  const rotateLeft = (value, shift) => (value << shift) | (value >>> (32 - shift));
  const addUnsigned = (x, y) => {
    const x4 = x & 0x40000000;
    const y4 = y & 0x40000000;
    const x8 = x & 0x80000000;
    const y8 = y & 0x80000000;
    const result = (x & 0x3fffffff) + (y & 0x3fffffff);
    if (x4 & y4) return result ^ 0x80000000 ^ x8 ^ y8;
    if (x4 | y4) {
      if (result & 0x40000000) return result ^ 0xc0000000 ^ x8 ^ y8;
      return result ^ 0x40000000 ^ x8 ^ y8;
    }
    return result ^ x8 ^ y8;
  };
  const toWordArray = (str) => {
    const l = str.length;
    const n = ((l + 8) >> 6) + 1;
    const words = new Array(n * 16).fill(0);
    let i;
    for (i = 0; i < l; i += 1) {
      words[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
    }
    words[i >> 2] |= 0x80 << ((i % 4) * 8);
    words[n * 16 - 2] = l * 8;
    return words;
  };
  const wordToHex = (value) => {
    let hex = "";
    for (let i = 0; i <= 3; i += 1) {
      hex += ((value >> (i * 8)) & 255).toString(16).padStart(2, "0");
    }
    return hex;
  };

  const x = toWordArray(string);
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  const ff = (a1, b1, c1, d1, x1, s, ac) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a1, (b1 & c1) | (~b1 & d1)), addUnsigned(x1, ac)), s), b1);
  const gg = (a1, b1, c1, d1, x1, s, ac) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a1, (b1 & d1) | (c1 & ~d1)), addUnsigned(x1, ac)), s), b1);
  const hh = (a1, b1, c1, d1, x1, s, ac) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a1, b1 ^ c1 ^ d1), addUnsigned(x1, ac)), s), b1);
  const ii = (a1, b1, c1, d1, x1, s, ac) =>
    addUnsigned(rotateLeft(addUnsigned(addUnsigned(a1, c1 ^ (b1 | ~d1)), addUnsigned(x1, ac)), s), b1);

  for (let i = 0; i < x.length; i += 16) {
    const aa = a;
    const bb = b;
    const cc = c;
    const dd = d;

    a = ff(a, b, c, d, x[i], 7, 0xd76aa478);
    d = ff(d, a, b, c, x[i + 1], 12, 0xe8c7b756);
    c = ff(c, d, a, b, x[i + 2], 17, 0x242070db);
    b = ff(b, c, d, a, x[i + 3], 22, 0xc1bdceee);
    a = ff(a, b, c, d, x[i + 4], 7, 0xf57c0faf);
    d = ff(d, a, b, c, x[i + 5], 12, 0x4787c62a);
    c = ff(c, d, a, b, x[i + 6], 17, 0xa8304613);
    b = ff(b, c, d, a, x[i + 7], 22, 0xfd469501);
    a = ff(a, b, c, d, x[i + 8], 7, 0x698098d8);
    d = ff(d, a, b, c, x[i + 9], 12, 0x8b44f7af);
    c = ff(c, d, a, b, x[i + 10], 17, 0xffff5bb1);
    b = ff(b, c, d, a, x[i + 11], 22, 0x895cd7be);
    a = ff(a, b, c, d, x[i + 12], 7, 0x6b901122);
    d = ff(d, a, b, c, x[i + 13], 12, 0xfd987193);
    c = ff(c, d, a, b, x[i + 14], 17, 0xa679438e);
    b = ff(b, c, d, a, x[i + 15], 22, 0x49b40821);

    a = gg(a, b, c, d, x[i + 1], 5, 0xf61e2562);
    d = gg(d, a, b, c, x[i + 6], 9, 0xc040b340);
    c = gg(c, d, a, b, x[i + 11], 14, 0x265e5a51);
    b = gg(b, c, d, a, x[i], 20, 0xe9b6c7aa);
    a = gg(a, b, c, d, x[i + 5], 5, 0xd62f105d);
    d = gg(d, a, b, c, x[i + 10], 9, 0x02441453);
    c = gg(c, d, a, b, x[i + 15], 14, 0xd8a1e681);
    b = gg(b, c, d, a, x[i + 4], 20, 0xe7d3fbc8);
    a = gg(a, b, c, d, x[i + 9], 5, 0x21e1cde6);
    d = gg(d, a, b, c, x[i + 14], 9, 0xc33707d6);
    c = gg(c, d, a, b, x[i + 3], 14, 0xf4d50d87);
    b = gg(b, c, d, a, x[i + 8], 20, 0x455a14ed);
    a = gg(a, b, c, d, x[i + 13], 5, 0xa9e3e905);
    d = gg(d, a, b, c, x[i + 2], 9, 0xfcefa3f8);
    c = gg(c, d, a, b, x[i + 7], 14, 0x676f02d9);
    b = gg(b, c, d, a, x[i + 12], 20, 0x8d2a4c8a);

    a = hh(a, b, c, d, x[i + 5], 4, 0xfffa3942);
    d = hh(d, a, b, c, x[i + 8], 11, 0x8771f681);
    c = hh(c, d, a, b, x[i + 11], 16, 0x6d9d6122);
    b = hh(b, c, d, a, x[i + 14], 23, 0xfde5380c);
    a = hh(a, b, c, d, x[i + 1], 4, 0xa4beea44);
    d = hh(d, a, b, c, x[i + 4], 11, 0x4bdecfa9);
    c = hh(c, d, a, b, x[i + 7], 16, 0xf6bb4b60);
    b = hh(b, c, d, a, x[i + 10], 23, 0xbebfbc70);
    a = hh(a, b, c, d, x[i + 13], 4, 0x289b7ec6);
    d = hh(d, a, b, c, x[i], 11, 0xeaa127fa);
    c = hh(c, d, a, b, x[i + 3], 16, 0xd4ef3085);
    b = hh(b, c, d, a, x[i + 6], 23, 0x04881d05);
    a = hh(a, b, c, d, x[i + 9], 4, 0xd9d4d039);
    d = hh(d, a, b, c, x[i + 12], 11, 0xe6db99e5);
    c = hh(c, d, a, b, x[i + 15], 16, 0x1fa27cf8);
    b = hh(b, c, d, a, x[i + 2], 23, 0xc4ac5665);

    a = ii(a, b, c, d, x[i], 6, 0xf4292244);
    d = ii(d, a, b, c, x[i + 7], 10, 0x432aff97);
    c = ii(c, d, a, b, x[i + 14], 15, 0xab9423a7);
    b = ii(b, c, d, a, x[i + 5], 21, 0xfc93a039);
    a = ii(a, b, c, d, x[i + 12], 6, 0x655b59c3);
    d = ii(d, a, b, c, x[i + 3], 10, 0x8f0ccc92);
    c = ii(c, d, a, b, x[i + 10], 15, 0xffeff47d);
    b = ii(b, c, d, a, x[i + 1], 21, 0x85845dd1);
    a = ii(a, b, c, d, x[i + 8], 6, 0x6fa87e4f);
    d = ii(d, a, b, c, x[i + 15], 10, 0xfe2ce6e0);
    c = ii(c, d, a, b, x[i + 6], 15, 0xa3014314);
    b = ii(b, c, d, a, x[i + 13], 21, 0x4e0811a1);
    a = ii(a, b, c, d, x[i + 4], 6, 0xf7537e82);
    d = ii(d, a, b, c, x[i + 11], 10, 0xbd3af235);
    c = ii(c, d, a, b, x[i + 2], 15, 0x2ad7d2bb);
    b = ii(b, c, d, a, x[i + 9], 21, 0xeb86d391);

    a = addUnsigned(a, aa);
    b = addUnsigned(b, bb);
    c = addUnsigned(c, cc);
    d = addUnsigned(d, dd);
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
};

export default {
  init: () => ({ hash: "" }),
  render: (container, state) => {
    container.innerHTML = `
      <div class="form-group">
        <label for="hash-input">Text to hash</label>
        <textarea id="hash-input" placeholder="Enter text"></textarea>
      </div>
      <div class="form-group">
        <label for="hash-algorithm">Algorithm</label>
        <select id="hash-algorithm">
          <option value="md5">MD5</option>
          <option value="sha-256">SHA-256</option>
        </select>
      </div>
      <button class="button" id="hash-generate">Generate Hash</button>
      <div class="form-group">
        <label for="hash-output">Hash</label>
        <input id="hash-output" type="text" readonly value="${state.hash}" />
      </div>
    `;

    const output = container.querySelector("#hash-output");
    container.querySelector("#hash-generate").addEventListener("click", async () => {
      const value = container.querySelector("#hash-input").value;
      const algorithm = container.querySelector("#hash-algorithm").value;

      if (algorithm === "md5") {
        state.hash = md5(value);
        output.value = state.hash;
        return;
      }

      const encoded = new TextEncoder().encode(value);
      const digest = await window.crypto.subtle.digest("SHA-256", encoded);
      state.hash = toHex(digest);
      output.value = state.hash;
    });
  },
  destroy: (container) => {
    container.innerHTML = "";
  },
};
