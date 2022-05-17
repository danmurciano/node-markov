const markov = require('./markov');
const { mockRandom } = require("jest-mock-random");

let mm;

beforeAll(function() {
  mm = new markov.MarkovMachine("the cat in the hat");
});


describe("makeChains", function() {
  it ("sets markov chains", function() {
    expect(mm.makeChains().size).toEqual(4);
    expect(mm.makeChains().get("the")).toEqual(["cat", "hat"]);
    expect(mm.makeChains().get("cat")).toEqual(["in"]);
    expect(mm.makeChains().get("in")).toEqual(["the"]);
    expect(mm.makeChains().get("hat")).toEqual([null]);
  });
});


describe("makeText", function() {
  it ("returns random text from chains", function() {
    mm.makeChains();

    mockRandom(0.1);
    expect(mm.makeText(numWords=10)).toBe("the cat in the cat in the cat in the");
    expect(mm.makeText().split(" ").length).toEqual(100);

    mockRandom(0.5);
    expect(mm.makeText(numWords=50)).toBe("in the hat");
  });
});
